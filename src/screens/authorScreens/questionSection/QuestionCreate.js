import { ScrollView, Text, View, TextInput as Input } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import DocumentPicker from 'react-native-document-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../../helpers';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { CREATE_QUESTION_MUTATION } from '../../../graphql/query';
import Wraper from '../../../components/utilities/Wraper';
import { BASE_URL } from '@env';
import Card from '../../../components/utilities/Card';
import FlatButton from '../../../components/utilities/FlatButton';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import Loading from '../../../components/utilities/Loading';

const QuestionCreate = () => {
    const richText = React.useRef();
    const [data, setData] = useState({});
    const [options, setOptions] = useState({});
    const [ans, setAns] = useState([]);
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();

    const [submitQuestion, { loading, data: mutationData }] = useMutation(CREATE_QUESTION_MUTATION);

    const imageToText = async () => {
        try {
            const image = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images]
            });
            let fd = new FormData();
            fd.append('image', image);
            const imgUploadUrl = BASE_URL + '/imgToText';
            const response = await fetch(imgUploadUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: fd
            });
            const content = await response.json();
            if (content.status) {
                console.log('Text: ', content.text);
                richText.current.setContentHTML(content.text);
                setData(pre => ({ ...pre, description: content.text }));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCancel = key => {
        setOptions(prevData => {
            const newData = { ...prevData };
            delete newData[key];
            return newData;
        });
    };

    const handleSubmit = async () => {
        try {
            const variables = {
                ...data,
                options: Object.values(options),
                privacy: 'private',
                marks: 1,
                token: auth.token
            };
            console.log(data);
            await submitQuestion({ variables: variables });
        } catch (error) {
            console.log(error);
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    const onPressAddImage = () => {
        ImageCropPicker.openPicker({
            cropping: true,
            freeStyleCropEnabled: true,
            mediaType: 'photo'
        }).then(image => {
            const fileSizeInMB = image.size / (1024 * 1024);
            if (fileSizeInMB >= 1)
                FUNCTIONS.showToast2(false, 'Image size should be less than 1MB.');
            else convertBase64(image);
        });
    };

    const convertBase64 = image => {
        ImgToBase64.getBase64String(image.path)
            .then(base64String => {
                richText.current?.insertImage(`data:${image.mime};base64,${base64String}`);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        const arrayOfOptions = Object.values(options);
        let ansOptions = arrayOfOptions.map((it, id) => ({ key: id, value: it }));
        ansOptions = ansOptions.filter(op => op.value !== '');
        setAns(ansOptions);

        if (!arrayOfOptions.includes(data.answer)) {
            setData(prevData => {
                const newData = { ...prevData };
                delete newData['answer'];
                return newData;
            });
        }
    }, [options]);

    useEffect(() => {
        if (mutationData) {
            FUNCTIONS.showToast2(
                mutationData.createQuestion.status,
                mutationData.createQuestion.message
            );
            if (mutationData.createQuestion.status) navigation.goBack();
        }
    }, [mutationData]);

    return (
        <>
            <Wraper head={'Create Question'}>
                <View className="flex flex-col justify-between">
                    <View className="space-y-1 mb-24">
                        <Card title={'Question title'}>
                            <Input
                                placeholder="Question Title"
                                className="px-2 py-1 text-base"
                                value={data.title}
                                onChangeText={val => setData(p => ({ ...p, title: val }))}
                            />
                        </Card>

                        <Card
                            title={'Question description'}
                            rightIcon={'camera'}
                            onPress={imageToText}>
                            <ScrollView>
                                <RichEditor
                                    initialHeight={150}
                                    placeholder="Question description..."
                                    ref={richText}
                                    initialContentHTML={data.description}
                                    onChange={d => setData(pre => ({ ...pre, description: d }))}
                                />
                            </ScrollView>
                            <RichToolbar
                                editor={richText}
                                onPressAddImage={onPressAddImage}
                                actions={[
                                    actions.setBold,
                                    actions.setItalic,
                                    actions.setUnderline,
                                    actions.heading1,
                                    actions.insertImage,
                                    actions.insertBulletsList,
                                    actions.insertOrderedList,
                                    actions.checkboxList,
                                    actions.insertLink,
                                    actions.setStrikethrough,
                                    actions.removeFormat,
                                    actions.undo,
                                    actions.redo
                                ]}
                                iconMap={{
                                    [actions.heading1]: ({ tintColor }) => (
                                        <Text style={[{ color: tintColor }]}>H1</Text>
                                    )
                                }}
                            />
                        </Card>

                        <Card
                            title={'Options (min: 2, max: 5)'}
                            rightIcon={'plus'}
                            onPress={() =>
                                setOptions(pre => ({
                                    ...pre,
                                    [new Date().getTime()]: ''
                                }))
                            }>
                            {Object.keys(options).map((key, idx) => {
                                const lbl = 'Option ' + String.fromCharCode(97 + idx).toUpperCase();
                                return (
                                    <TextInput
                                        label={lbl}
                                        key={idx}
                                        value={options[key]}
                                        className="bg-white"
                                        onChangeText={val =>
                                            setOptions(pre => ({ ...pre, [key]: val }))
                                        }
                                        right={
                                            <TextInput.Icon
                                                icon="close"
                                                onPress={() => handleCancel(key)}
                                            />
                                        }
                                    />
                                );
                            })}
                        </Card>

                        <Card title="Answer">
                            <SelectList
                                data={ans}
                                save="value"
                                label="Answer"
                                search={false}
                                placeholder="Select answer"
                                boxStyles={{
                                    backgroundColor: '#FFF',
                                    borderRadius: 0,
                                    borderColor: '#FFF',
                                    borderBottomColor: '#000'
                                }}
                                setSelected={val => setData(pre => ({ ...pre, answer: val }))}
                            />
                        </Card>
                    </View>
                    <FlatButton title={'Create Now'} onPress={handleSubmit} />
                </View>
            </Wraper>
            <Loading loading={loading} />
        </>
    );
};

export default QuestionCreate;
