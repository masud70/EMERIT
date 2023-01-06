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
import { FUNCTIONS } from '../../../helpers';

const EditContest = ({ route }) => {
    const [item, setItem] = useState({});
    const [newData, setNewData] = useState({});
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [open, setOpen] = useState(false);
    const { data } = route.params;

    const addNewQuestion = () => {
        FUNCTIONS.addNewQuestion(newData)
            .then(res => {
                FUNCTIONS.showToast(
                    res.status ? 'success' : 'error',
                    res.status ? 'Success' : 'Error',
                    res.message
                );
                if (res.status) {
                    setOpen(false);
                }
            })
            .catch(err => FUNCTIONS.showToast('error', 'Error', err.message));
    };

    useEffect(() => {
        if (data) {
            setItem(data);
            setNewData(pre => ({
                ...pre,
                createdBy: data.createdBy,
                contestId: data.id
            }));
        }
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
                                {item.title}
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                label="Contest Title"
                                className="bg-gray-100 rounded"
                                value={item.title}
                                onChangeText={text => {
                                    setItem(pre => ({ ...pre, title: text }));
                                }}
                                right={<TextInput.Icon icon="pencil" />}
                            />
                            <TextInput
                                label="Description"
                                className="bg-gray-100 rounded"
                                value={data.description}
                                multiline
                                numberOfLines={4}
                                activeUnderlineColor="rgb(34,197,94)"
                                onChangeText={text =>
                                    setItem(pre => ({
                                        ...pre,
                                        description: text
                                    }))
                                }
                                right={<TextInput.Icon icon="pencil" />}
                            />
                            <TextInput
                                label="Start"
                                className="bg-gray-100"
                                onTouchEnd={() => setOpenDate(true)}
                                activeUnderlineColor="rgb(34,197,94)"
                                value={
                                    data.start
                                        ? moment(data.start).format(
                                              'DD/MM/YYYY h:mm A'
                                          )
                                        : ''
                                }
                                right={
                                    <TextInput.Icon
                                        name="calendar"
                                        color="#000"
                                        onPress={() => setOpenDate(true)}
                                    />
                                }
                            />
                            {/* <DatePicker
                            date={item.start ? item.start : new Date()}
                            modal
                            open={openDate}
                            mode="datetime"
                            activeUnderlineColor="rgb(34,197,94)"
                            onConfirm={date => {
                                setOpenDate(false);
                                setData(pre => ({
                                    ...pre,
                                    start: date
                                }));
                            }}
                            onCancel={() => {
                                setOpenDate(false);
                            }}
                        /> */}
                            <TextInput
                                label={'End'}
                                className="bg-gray-100"
                                onTouchEnd={() => setOpenTime(true)}
                                activeUnderlineColor="rgb(34,197,94)"
                                value={
                                    item.end
                                        ? moment(item.end).format(
                                              'DD/MM/YYYY h:mm A'
                                          )
                                        : ''
                                }
                                right={
                                    <TextInput.Icon
                                        name="calendar"
                                        color="#000"
                                        onPress={() => setOpenTime(true)}
                                    />
                                }
                            />
                            {/* <DatePicker
                            date={item.end ? item.end : new Date()}
                            modal
                            open={openTime}
                            mode="datetime"
                            onConfirm={time => {
                                setOpenTime(false);
                                setData(pre => ({
                                    ...pre,
                                    end: time
                                }));
                            }}
                            onCancel={() => {
                                setOpenTime(false);
                            }}
                        /> */}
                            <TextInput
                                value="60"
                                label="Duration"
                                className="bg-gray-100 rounded"
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
                            value={newData.title}
                            multiline
                            numberOfLines={3}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
                                    ...pre,
                                    title: text
                                }))
                            }
                        />
                        <TextInput
                            label="Description"
                            className="bg-gray-50 rounded"
                            value={newData.description}
                            multiline
                            numberOfLines={10}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
                                    ...pre,
                                    description: text
                                }))
                            }
                        />
                        <TextInput
                            label="Marks"
                            className="bg-gray-50 rounded"
                            value={newData.marks}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
                                    ...pre,
                                    marks: text
                                }))
                            }
                        />
                        <TextInput
                            label="Option A"
                            className="bg-gray-50 rounded"
                            value={newData.optA}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
                                    ...pre,
                                    optA: text
                                }))
                            }
                        />
                        <TextInput
                            label="Option B"
                            className="bg-gray-50 rounded"
                            value={newData.optB}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
                                    ...pre,
                                    optB: text
                                }))
                            }
                        />
                        <TextInput
                            label="Option C"
                            className="bg-gray-50 rounded"
                            value={newData.optC}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
                                    ...pre,
                                    optC: text
                                }))
                            }
                        />
                        <TextInput
                            label="Option D"
                            className="bg-gray-50 rounded"
                            value={newData.optD}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
                                    ...pre,
                                    optD: text
                                }))
                            }
                        />
                        <TextInput
                            label="Correct Answer"
                            className="bg-gray-50 rounded"
                            value={newData.optansA}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
                                    ...pre,
                                    ans: text
                                }))
                            }
                        />
                        <TextInput
                            label="Order"
                            className="bg-gray-50 rounded"
                            value={newData.order}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setNewData(pre => ({
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
