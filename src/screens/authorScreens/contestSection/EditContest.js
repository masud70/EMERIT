import { ImageBackground, SafeAreaView, ScrollView, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ROUTES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_CONTEST_BY_CONTEST_ID_QUERY } from '../../../graphql/query';
import UpdateItem from '../../../components/Author/UpdateItem';

const EditContest = ({ route }) => {
    const [newData, setNewData] = useState({});
    const navigation = useNavigation();
    const { contestId } = route.params;

    const { loading, error, data, refetch } = useQuery(GET_CONTEST_BY_CONTEST_ID_QUERY, {
        variables: { id: contestId }
    });

    useEffect(() => {
        if (data) {
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

    // if (!updateLoading && updateData) {
    //     console.log(updateData);
    //     FUNCTIONS.showToast2(updateData.updateContest.status, updateData.updateContest.message);
    //     navigation.navigate(ROUTES.AUTHOR_CONTEST);
    // } else if (updateError) console.log(false, updateError.message);

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
                {/* <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}> */}
                <View className="h-screen px-2 py-1 w-screen bg-white">
                    <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                        <Text className="font-bold text-xl ">Update Contest</Text>
                    </View>
                    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
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
                                <Pressable
                                    className="w-full bg-[#2B3467] rounded overflow-hidden"
                                    onPress={() =>
                                        navigation.navigate(ROUTES.AUTHOR_UPDATE_QUESTION, {
                                            id: contestId
                                        })
                                    }>
                                    <Text className="font-bold text-white text-center p-2 text-lg">
                                        Update Question
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                    <Pressable
                        className="w-full bg-[#2B3467] p-2 my-2 rounded items-center"
                        >
                        <Text className="font-bold text-white text-lg">Update</Text>
                    </Pressable>
                </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        );
};

export default EditContest;
