import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TextInput as Input
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { ROUTES } from '../../../constants';
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
import { UPDATE } from '../../../graphql/contestMutation';
import UpdateItem from '../../../components/Author/UpdateItem';

const EditContest = ({ route }) => {
    const [newData, setNewData] = useState({});
    const [question, setQuestion] = useState([]);
    const [selected, setSelected] = useState([]);
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();
    const { contestId } = route.params;

    const { loading, error, data, refetch } = useQuery(GET_CONTEST_BY_CONTEST_ID_QUERY, {
        variables: { id: contestId }
    });

    const {
        loading: questionLoading,
        error: questionError,
        data: questionData
    } = useQuery(GET_ALL_QUESTION_BY_USER_ID_QUERY, { variables: { token: auth.token } });

    const [updateNow, { loading: updateLoading, error: updateError, data: updateData }] =
        useMutation(UPDATE_CONTEST_MUTATION);

    const [update, { loading: updLoading, error: updError, data: updData }] = useMutation(UPDATE);

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
                start: data.getContestByContestId.start,
                privacy: data.getContestByContestId.privacy,
                password: data.getContestByContestId.password
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

    if (loading || error || !newData) {
        <SafeAreaView>
            <ScrollView>
                <View className="h-screen px-2 py-1 w-screen bg-white">
                    <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                        <Text className="font-bold text-xl ">Update Contest</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>;
    } else
        return (
            <SafeAreaView>
                <ScrollView>
                    <View className="h-screen px-2 py-1 w-screen bg-white">
                        <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                            <Text className="font-bold text-xl ">Update Contest</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="rounded overflow-hidden my-1">
                                <ImageBackground
                                    source={{ uri: 'https://picsum.photos/900' }}
                                    className="w-full h-[140px]"
                                />
                                <View className="w-full bg-[#2B3467] p-1">
                                    <Text className="font-bold text-xl text-gray-50">
                                        {data.getContestByContestId.title}
                                    </Text>
                                </View>

                                <View className="flex space-y-2">
                                    {/* Contest Title Update */}
                                    <UpdateItem
                                        field={'title'}
                                        value={newData.title}
                                        placeholder="Contest title"
                                        detail="Update contest title"
                                        onUpdate={setNewData}
                                        contestId={contestId}
                                        refetch={refetch}
                                    />

                                    {/* Update description */}
                                    <UpdateItem
                                        field={'description'}
                                        value={newData.description}
                                        placeholder="Contest description..."
                                        detail="Update description"
                                        onUpdate={setNewData}
                                        contestId={contestId}
                                        refetch={refetch}
                                    />

                                    {/* Contest start time */}
                                    <UpdateItem
                                        field={'start'}
                                        value={newData.start}
                                        placeholder="Start time"
                                        detail="Update start time"
                                        onUpdate={setNewData}
                                        contestId={contestId}
                                        refetch={refetch}
                                    />

                                    {/* Contest duration Update */}
                                    <UpdateItem
                                        field={'duration'}
                                        value={newData.duration?.toString()}
                                        placeholder="Duration"
                                        detail="Update duration"
                                        onUpdate={setNewData}
                                        contestId={contestId}
                                        refetch={refetch}
                                    />

                                    {/* Contest privacy Update */}
                                    <UpdateItem
                                        field={'privacy'}
                                        value={newData.privacy}
                                        placeholder="Privacy"
                                        detail="Update privacy"
                                        onUpdate={setNewData}
                                        contestId={contestId}
                                        password={newData.password}
                                        refetch={refetch}
                                    />

                                    {/* Contest Question Update */}
                                    <View className="w-full rounded overflow-hidden bg-[#00000006] flex flex-col my-4">
                                        <View>
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
                                        </View>
                                        <View className="flex flex-row justify-between items-center bg-[#2b346710]">
                                            <View className="w-3/4 p-1">
                                                <Text className="text-[#2B3467] text-base">
                                                    Update question(s)
                                                </Text>
                                            </View>
                                            <View className="w-1/4 p-1 bg-[#2B3467]">
                                                <Pressable className="w-full">
                                                    <Text className="w-full text-center text-lg text-white font-bold">
                                                        Update
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <Pressable
                            className="w-full bg-[#2B3467] p-2 my-2 rounded items-center"
                            onPress={submitUpdate}>
                            <Text className="font-bold text-white text-lg">Update</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
};

export default EditContest;
