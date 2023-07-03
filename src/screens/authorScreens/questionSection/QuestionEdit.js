import { Text, View, TextInput as Input, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Wraper from '../../../components/utilities/Wraper';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { IconButton, TextInput } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../../helpers';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import Loading from '../../../components/utilities/Loading';
import { BASE_URL } from '@env';
import { GET_QUESTION } from '../../../graphql/contestQuery';
import { Pressable } from 'react-native';
import { UPDATE_QUESTION } from '../../../graphql/contestMutation';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';

const QuestionEdit = ({ route }) => {
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();
    const [data, setData] = useState({});
    const [optionArray, setOptionArray] = useState({});
    const [ans, setAns] = useState([]);
    const richText = useRef();

    const {
        loading: questionLoading,
        error: questionError,
        data: questionData,
        refetch
    } = useQuery(GET_QUESTION, { variables: { id: route.params.id, token: auth.token } });

    const [updateQuestion, { loading: updateLoading, data: updateData, error: updateError }] =
        useMutation(UPDATE_QUESTION);

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
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleCancel = key => {
        setOptionArray(prevData => {
            const newData = { ...prevData };
            delete newData[key];
            return newData;
        });
    };
    const handleSubmit = async () => {
        const variables = {
            ...data,
            token: auth.token,
            options: Object.values(optionArray)
        };
        try {
            await updateQuestion({
                variables: variables
            });
            refetch();
        } catch (error) {
            console.log(error.message);
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
        const arrayOfOptions = Object.values(optionArray);
        let ansOptions = arrayOfOptions.map((it, id) => ({ key: id.toString(), value: it }));
        ansOptions = ansOptions.filter(op => op.value !== '');
        setAns(ansOptions);

        if (!arrayOfOptions.includes(data.answer)) {
            setData(prevData => {
                const newData = { ...prevData };
                delete newData['answer'];
                return newData;
            });
        }
    }, [optionArray]);

    useEffect(() => {
        if (!questionLoading && questionData) {
            const { Options, ...question } = questionData.getQuestion;
            const { __typename, status, message, ...onlyData } = question;
            setData(onlyData);

            setOptionArray(
                Object.assign(
                    {},
                    ...Options.map(item => ({
                        [item.id]: item.value
                    }))
                )
            );
        }
    }, [questionData]);

    useEffect(() => {
        if (!updateLoading && updateData) {
            FUNCTIONS.showToast2(
                updateData.updateQuestion.status,
                updateData.updateQuestion.message
            );
            if (updateData.updateQuestion.status) navigation.goBack();
        }
    }, [updateData]);

    if (questionLoading || questionError) {
        return (
            <View className="w-screen h-screen bg-slate-600">
                <Loading loading={questionLoading || questionError} />
            </View>
        );
    }

    return (
        <Wraper head="Update Question" refresh={{ loading: questionLoading, refetch: refetch }}>
            <View className="space-y-2">
                <View className="w-full flex rounded overflow-hidden border border-[#2B3467]">
                    <Text className="w-full bg-[#2B3467] font-bold text-base text-white p-2">
                        Question title
                    </Text>
                    <Input
                        value={data.title}
                        placeholder="Question Title"
                        className="p-2 text-base"
                        onChangeText={val => setData(pre => ({ ...pre, title: val }))}
                    />
                </View>

                <View className="w-full flex rounded overflow-hidden border border-[#2B3467]">
                    <View className="w-full bg-[#2B3467] pl-2 flex flex-row items-center justify-between">
                        <Text className="font-bold text-base text-white">Question description</Text>
                        <IconButton
                            className="bg-gray-100"
                            icon={'camera'}
                            size={15}
                            onPress={imageToText}
                        />
                    </View>
                    <ScrollView>
                        <RichEditor
                            className="p-[2px] bg-slate-300"
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
                </View>

                <View className="w-full flex rounded overflow-hidden border border-[#2B3467]">
                    <View className="w-full bg-[#2B3467] pl-2 flex flex-row items-center justify-between">
                        <Text className="font-bold text-base text-white">
                            Options (min: 2, max: 5)
                        </Text>
                        <IconButton
                            className="bg-gray-100"
                            icon={'plus'}
                            size={15}
                            onPress={() =>
                                setOptionArray(pre => ({
                                    ...pre,
                                    [new Date().getTime()]: ''
                                }))
                            }
                        />
                    </View>
                    {Object.keys(optionArray).map((key, idx) => {
                        const lbl = 'Option ' + String.fromCharCode(97 + idx).toUpperCase();
                        return (
                            <TextInput
                                label={lbl}
                                key={idx}
                                value={optionArray[key]}
                                className="bg-white"
                                onChangeText={val =>
                                    setOptionArray(pre => ({ ...pre, [key]: val }))
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
                </View>

                <View className="w-full flex rounded overflow-hidden border border-[#2B3467]">
                    <Text className="w-full bg-[#2B3467] font-bold text-base text-white p-2">
                        Answer
                    </Text>
                    <SelectList
                        data={ans}
                        save="value"
                        label="Answer"
                        search={false}
                        defaultOption={ans.find(
                            obj => obj.value === questionData.getQuestion.answer
                        )}
                        placeholder="Select answer"
                        boxStyles={{
                            backgroundColor: '#FFF',
                            borderRadius: 0,
                            borderColor: '#FFF',
                            borderBottomColor: '##2B3467'
                        }}
                        setSelected={val => setData(pre => ({ ...pre, answer: val }))}
                    />
                </View>

                <View className="w-full flex rounded overflow-hidden border border-[#2B3467]">
                    <Text className="w-full bg-[#2B3467] font-bold text-base text-white p-2">
                        Marks
                    </Text>
                    <Input
                        value={data.marks ? data.marks.toString() : ''}
                        placeholder="Marks"
                        className="p-2 text-base"
                        onChangeText={val => setData(pre => ({ ...pre, marks: parseInt(val) }))}
                    />
                </View>
            </View>
            <Pressable onPress={handleSubmit}>
                <Text className="w-full p-2 font-bold text-center text-lg bg-[#2B3467] rounded text-white my-2">
                    Update Now
                </Text>
            </Pressable>
        </Wraper>
    );
};

export default QuestionEdit;
