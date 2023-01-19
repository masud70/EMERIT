import { ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Pressable } from 'react-native';
import { CONSTANT, ROUTES } from '../../../constants';
import { useSelector } from 'react-redux';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { FUNCTIONS } from '../../../helpers';
import { useNavigation } from '@react-navigation/native';

const EditContest = ({ route }) => {
    const [item, setItem] = useState({});
    const [newData, setNewData] = useState({});
    const [question, setQuestion] = useState([]);
    const [selected, setSelected] = useState([]);
    const [openDate, setOpenDate] = useState(false);
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();
    const { data } = route.params;

    const loadQuestion = () => {
        const url = CONSTANT.BASE_URL + '/contest/getAvaliableQuestion';
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            }
        })
            .then(response => response.json())
            .then(res => {
                console.log(res);
                if (res.status) {
                    const array = res.data.map(item => ({ key: item.id, value: item.title }));
                    setQuestion(array);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const submitUpdate = () => {
        const url = CONSTANT.BASE_URL + '/contest/update';
        console.log({
            ...newData,
            questions: selected
        });
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            },
            body: JSON.stringify({
                ...newData,
                questions: selected
            })
        })
            .then(r => r.json())
            .then(res => {
                console.log(res);
                FUNCTIONS.showToast2(res.status, res.message);
                if (res.status) {
                    navigation.navigate(ROUTES.AUTHOR_CONTEST);
                }
            })
            .catch(err => {
                FUNCTIONS.showToast2(false, err.message);
            });
    };

    useEffect(() => {
        loadQuestion();
        if (data) {
            setItem(data);
            setNewData(data);
        }
        console.log(data);
    }, []);
    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <SafeAreaView>
            <ScrollView>
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
                                    {newData?.title}
                                </Text>
                            </View>
                            <View>
                                <TextInput
                                    label="Contest Title"
                                    className="bg-gray-100 rounded"
                                    value={newData?.title}
                                    activeUnderlineColor="rgb(34,197,94)"
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
                                        newData.description ? newData.description : item.description
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
                                    value={moment.unix(newData?.start).format('DD/MM/YYYY h:mm A')}
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
                                    value={newData?.duration}
                                    label="Duration"
                                    className="bg-gray-100 rounded"
                                    onChangeText={d => setNewData(pre => ({ ...pre, duration: d }))}
                                />
                            </View>
                            <View className="w-full my-2">
                                <View className="w-full items-center bg-green-50 p-2">
                                    <Text className="font-bold text-lg text-gray-600">
                                        Questions
                                    </Text>
                                </View>
                                <View className="w-full my-1 space-y-1">
                                    <MultipleSelectList
                                        data={question}
                                        className="bg-green-200"
                                        boxStyles={{ backgroundColor: '#DCFCE7' }}
                                        save="key"
                                        search={false}
                                        placeholder="Select question"
                                        setSelected={val => setSelected(val)}
                                    />
                                    {/* {selected.map((item, idx) => {
                                        return (
                                            <Pressable
                                                className="w-full flex flex-row rounded overflow-hidden"
                                                key={idx}>
                                                <View className="w-2/12 p-1 justify-center items-center bg-gray-600">
                                                    <Text className="text-white font-bold">
                                                        {String.fromCharCode(
                                                            97 + idx
                                                        ).toUpperCase()}
                                                    </Text>
                                                </View>
                                                <Text className="w-10/12 p-1 bg-green-50 font-base">
                                                    {item}
                                                </Text>
                                            </Pressable>
                                        );
                                    })} */}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <Pressable
                        className="w-full bg-gray-700 p-2 my-2 rounded items-center"
                        onPress={submitUpdate}>
                        <Text className="font-bold text-white text-lg">Save Now</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditContest;
