import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconButton, TextInput } from 'react-native-paper';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { SelectList } from 'react-native-dropdown-select-list';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../../helpers';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { CREATE_QUESTION_MUTATION } from '../../../graphql/query';
import { ROUTES } from '../../../constants';

const QuestionCreate = () => {
    const richText = React.useRef();
    const [data, setData] = useState({});
    const [options, setOptions] = useState({});
    const [ans, setAns] = useState([]);
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();

    const [submitQuestion, { loading, error, data: mutationData }] =
        useMutation(CREATE_QUESTION_MUTATION);

    const handleCancel = key => {
        setOptions(prevData => {
            const newData = { ...prevData };
            delete newData[key];
            return newData;
        });
    };

    const handleSubmit = () => {
        const variables = {
            ...data,
            options: Object.values(options),
            privacy: 'private',
            marks: 1,
            token: auth.token
        };

        console.log(variables);

        submitQuestion({ variables: variables });
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

    if (!loading && mutationData) {
        FUNCTIONS.showToast2(
            mutationData.createQuestion.status,
            mutationData.createQuestion.message
        );
        navigation.navigate(ROUTES.AUTHOR_QUESTION);
    }

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="h-screen px-2 py-1 w-screen bg-white">
                    <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                        <Text className="font-bold text-xl ">Question</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="space-y-1 mt-1">
                            <TextInput
                                label="Question Title"
                                value={data.title}
                                onChangeText={val => setData(p => ({ ...p, title: val }))}
                            />
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
                                actions={[
                                    actions.setBold,
                                    actions.setItalic,
                                    actions.setUnderline,
                                    actions.heading1,
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
                            <View className=" space-y-1">
                                <View className="flex-row justify-between items-center">
                                    <Text className="font-bold text-lg">
                                        Options (min: 2, max: 5)
                                    </Text>
                                    <IconButton
                                        className="bg-gray-100"
                                        icon={'plus'}
                                        size={20}
                                        onPress={() =>
                                            setOptions(pre => ({
                                                ...pre,
                                                [new Date().getTime()]: ''
                                            }))
                                        }
                                    />
                                </View>
                                {Object.keys(options).map((key, idx) => {
                                    const lbl =
                                        'Option ' + String.fromCharCode(97 + idx).toUpperCase();
                                    return (
                                        <TextInput
                                            label={lbl}
                                            key={idx}
                                            value={options[key]}
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
                            </View>
                            <View className="">
                                <Text className="font-bold text-lg">Answer</Text>
                                <SelectList
                                    className="bg-green-200"
                                    data={ans}
                                    save="value"
                                    label="Answer"
                                    search={false}
                                    placeholder="Select answer"
                                    boxStyles={{ backgroundColor: '#DCFCE7' }}
                                    setSelected={val => setData(pre => ({ ...pre, answer: val }))}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <Pressable onPress={handleSubmit}>
                        <Text className="w-full p-2 font-bold text-center text-lg bg-green-500 rounded-lg text-white my-2">
                            Save Now
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default QuestionCreate;

const styles = StyleSheet.create({});
