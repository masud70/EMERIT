import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    View
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Dialog, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';

const EditContest = ({ route }) => {
    const [item, setItem] = useState({});
    const [newData, setNewData] = useState({});
    const [question, setQuestion] = useState({});
    const [openDate, setOpenDate] = useState(false);
    const [open, setOpen] = useState(false);
    const { data } = route.params;

    const addNewQuestion = () => {
        console.log(newData);
    };

    const submitUpdate = () => {
        console.log(newData);
    };

    useEffect(() => {
        if (data) {
            setItem(data);
        }
        console.log(data);
    }, []);

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl ">Edit Contest</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="rounded overflow-hidden my-1">
                        <ImageBackground
                            source={{ uri: 'https://picsum.photos/900' }}
                            className="w-full h-[140px]"
                        />
                        <View className="w-full bg-gray-600 p-1">
                            <Text className="font-bold text-xl text-gray-50">
                                {newData.title ? newData.title : item.title}
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                label="Contest Title"
                                className="bg-gray-100 rounded"
                                value={
                                    newData.title ? newData.title : item.title
                                }
                                onChangeText={text => {
                                    setNewData(pre => ({
                                        ...pre,
                                        title: text
                                    }));
                                }}
                            />
                            <TextInput
                                label="Description"
                                className="bg-gray-100 rounded"
                                value={
                                    newData.description
                                        ? newData.description
                                        : item.description
                                }
                                multiline
                                numberOfLines={4}
                                activeUnderlineColor="rgb(34,197,94)"
                                onChangeText={text =>
                                    setNewData(pre => ({
                                        ...pre,
                                        description: text
                                    }))
                                }
                            />
                            <TextInput
                                label="Start"
                                className="bg-gray-100"
                                onTouchEnd={() => setOpenDate(true)}
                                activeUnderlineColor="rgb(34,197,94)"
                                value={moment
                                    .unix(
                                        newData.start
                                            ? newData.start
                                            : item.start
                                    )
                                    .format('DD/MM/YYYY h:mm A')}
                                right={
                                    <TextInput.Icon
                                        icon="calendar"
                                        onPress={() => setOpenDate(true)}
                                    />
                                }
                            />
                            <DatePicker
                                date={
                                    new Date(
                                        newData.start
                                            ? parseInt(newData.start) * 1000
                                            : new Date()
                                    )
                                }
                                modal
                                open={openDate}
                                mode="datetime"
                                activeUnderlineColor="rgb(34,197,94)"
                                onConfirm={date => {
                                    setOpenDate(false);
                                    setNewData(pre => ({
                                        ...pre,
                                        start: date.getTime() / 1000
                                    }));
                                }}
                                onCancel={() => {
                                    setOpenDate(false);
                                }}
                            />
                            <TextInput
                                value={item.duration}
                                label="Duration"
                                className="bg-gray-100 rounded"
                                onChangeText={d =>
                                    setNewData(pre => ({ ...pre, duration: d }))
                                }
                            />
                        </View>
                        <View className="w-full my-2">
                            <View className="w-full items-center bg-green-50 p-2">
                                <Text className="font-bold text-lg text-gray-600">
                                    Questions
                                </Text>
                            </View>
                            <View className="w-full my-1 space-y-1">
                                <TouchableOpacity className="w-full flex flex-row rounded overflow-hidden">
                                    <View className="w-2/12 p-1 justify-center items-center bg-gray-600">
                                        <Text className="text-white font-bold">
                                            A
                                        </Text>
                                    </View>
                                    <Text className="w-10/12 p-1 bg-green-50 font-base">
                                        Here goes the question title. the
                                        question title. Here goes the question
                                        title.
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="w-full flex flex-row rounded overflow-hidden">
                                    <View className="w-2/12 p-1 justify-center items-center bg-gray-600">
                                        <Text className="text-white font-bold">
                                            B
                                        </Text>
                                    </View>
                                    <Text className="w-10/12 p-1 bg-green-50 font-base">
                                        Here goes the question title. the
                                        question title. Here goes the question
                                        title.
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="w-full flex flex-row rounded overflow-hidden">
                                    <View className="w-2/12 p-1 justify-center items-center bg-gray-600">
                                        <Text className="text-white font-bold">
                                            C
                                        </Text>
                                    </View>
                                    <Text className="w-10/12 p-1 bg-green-50 font-base">
                                        Here goes the question title. the
                                        question title. Here goes the question
                                        title.
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="w-full flex flex-row rounded overflow-hidden"
                                    onPress={() => setOpen(true)}>
                                    <View className="w-full p-3 justify-center items-center bg-green-500">
                                        <Text className="text-white font-bold">
                                            Add New Question
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <Pressable
                                    className="w-full bg-gray-700 p-2 rounded items-center mt-2"
                                    onPress={submitUpdate}>
                                    <Text className="font-bold text-white text-lg">
                                        Save Now
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Dialog
                visible={open}
                onDismiss={() => setOpen(false)}
                className="bg-gray-50 mx-2 mt-12 mb-20">
                <Dialog.Title className="text-center">
                    Add New Question
                </Dialog.Title>
                <Dialog.ScrollArea className="space-y-1 px-4">
                    <ScrollView>
                        <TextInput
                            label="Title"
                            className="bg-gray-50 rounded"
                            value={question.title}
                            multiline
                            numberOfLines={3}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    title: text
                                }))
                            }
                        />
                        <TextInput
                            label="Description"
                            className="bg-gray-50 rounded"
                            value={question.description}
                            multiline
                            numberOfLines={10}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    description: text
                                }))
                            }
                        />
                        <TextInput
                            label="Marks"
                            className="bg-gray-50 rounded"
                            value={question.marks}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    marks: text
                                }))
                            }
                        />
                        <TextInput
                            label="Option A"
                            className="bg-gray-50 rounded"
                            value={question.optA}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    optA: text
                                }))
                            }
                        />
                        <TextInput
                            label="Option B"
                            className="bg-gray-50 rounded"
                            value={question.optB}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    optB: text
                                }))
                            }
                        />
                        <TextInput
                            label="Option C"
                            className="bg-gray-50 rounded"
                            value={question.optC}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    optC: text
                                }))
                            }
                        />
                        <TextInput
                            label="Option D"
                            className="bg-gray-50 rounded"
                            value={question.optD}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    optD: text
                                }))
                            }
                        />
                        <TextInput
                            label="Correct Answer"
                            className="bg-gray-50 rounded"
                            value={question.optansA}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    ans: text
                                }))
                            }
                        />
                        <TextInput
                            label="Order"
                            className="bg-gray-50 rounded"
                            value={question.order}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setQuestion(pre => ({
                                    ...pre,
                                    order: text
                                }))
                            }
                        />
                    </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button onPress={() => setOpen(false)}>Cancel</Button>
                    <Button onPress={addNewQuestion}>Save</Button>
                </Dialog.Actions>
            </Dialog>
        </SafeAreaView>
    );
};

export default EditContest;
