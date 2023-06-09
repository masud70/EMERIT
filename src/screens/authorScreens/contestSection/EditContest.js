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
import { useMutation, useQuery } from '@apollo/client';
import {
    GET_ALL_QUESTION_BY_USER_ID_QUERY,
    GET_CONTEST_BY_CONTEST_ID_QUERY,
    UPDATE_CONTEST_MUTATION
} from '../../../graphql/query';
import { ActivityIndicator } from 'react-native';

const EditContest = ({ route }) => {
    const [newData, setNewData] = useState({});
    const [question, setQuestion] = useState([]);
    const [selected, setSelected] = useState([]);
    const [openDate, setOpenDate] = useState(false);
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();
    const { contestId } = route.params;

    const { loading, error, data } = useQuery(GET_CONTEST_BY_CONTEST_ID_QUERY, {
        variables: { id: contestId }
    });

    const {
        loading: questionLoading,
        error: questionError,
        data: questionData
    } = useQuery(GET_ALL_QUESTION_BY_USER_ID_QUERY, { variables: { token: auth.token } });

    const [updateNow, { loading: updateLoading, error: updateError, data: updateData }] =
        useMutation(UPDATE_CONTEST_MUTATION);

    const submitUpdate = () => {
        updateNow({ variables: { ...newData, questions: selected, id: contestId } });
    };

    useEffect(() => {
        if (data) {
            const optionsDefault = data.getContestByContestId.Questions.map(item => item.id);
            setSelected(optionsDefault);
            setNewData({
                title: data.getContestByContestId.title,
                description: data.getContestByContestId.description,
                duration: data.getContestByContestId.duration,
                start: data.getContestByContestId.start
            });
        }
    }, [data]);

    useEffect(() => {
        if (questionData) {
            const array = questionData.getAllQuestionByUserId.map(item => ({
                key: item.id,
                value: item.title
            }));
            setQuestion(array);
        }
    }, [questionData]);

    if (!updateLoading && updateData) {
        console.log(updateData);
        FUNCTIONS.showToast2(updateData.updateContest.status, updateData.updateContest.message);
        navigation.navigate(ROUTES.AUTHOR_CONTEST);
    } else if (updateError) console.log(false, updateError.message);

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="h-screen px-2 py-1 w-screen bg-white">
                    <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                        <Text className="font-bold text-xl ">Edit Contest</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {loading || error ? (
                            <ActivityIndicator className="mt-10" size={40} color="gray" />
                        ) : (
                            <View className="rounded overflow-hidden my-1">
                                <ImageBackground
                                    source={{ uri: 'https://picsum.photos/900' }}
                                    className="w-full h-[140px]"
                                />
                                <View className="w-full bg-gray-600 p-1">
                                    <Text className="font-bold text-xl text-gray-50">
                                        {data.getContestByContestId.title}
                                    </Text>
                                </View>
                                <View>
                                    <TextInput
                                        label="Contest Title"
                                        className="bg-gray-100 rounded"
                                        value={newData.title}
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
                                            newData.description
                                                ? newData.description
                                                : data.getContestByContestId.description
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
                                                    : parseInt(data.getContestByContestId.start)
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
                                                    : parseInt(data.getContestByContestId.start) *
                                                      1000
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
                                                start: (date.getTime() / 1000).toString()
                                            }));
                                        }}
                                        onCancel={() => {
                                            setOpenDate(false);
                                        }}
                                    />
                                    <TextInput
                                        value={
                                            newData.duration
                                                ? newData.duration.toString()
                                                : data.getContestByContestId.duration.toString()
                                        }
                                        label="Duration"
                                        className="bg-gray-100 rounded"
                                        onChangeText={d =>
                                            setNewData(pre => ({ ...pre, duration: parseInt(d) }))
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
                                        <MultipleSelectList
                                            data={question}
                                            className="bg-green-200"
                                            boxStyles={{ backgroundColor: '#DCFCE7' }}
                                            save="key"
                                            search={true}
                                            placeholder="Select question"
                                            setSelected={val => setSelected(val)}
                                            defaultOption={{ [selected[0]]: 'Title' }}
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
                        )}
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
