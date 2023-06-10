import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RefreshControl } from 'react-native';
import style from '../../../styles/style.scss';
import { useQuery } from '@apollo/client';
import { GET_LEADERBOARD_QUERY } from '../../graphql/query';
import { ScrollView } from 'react-native';

const LeaderBoard = ({ route }) => {
    console.log(route.params);
    const { loading, error, data, refetch } = useQuery(GET_LEADERBOARD_QUERY, {
        variables: route.params
    });
    console.log('==>', loading, error, data);

    if (loading) {
        return (
            <SafeAreaView style={style.mainContainer}>
                <ScrollView
                    className="h-screen"
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
                    <View
                        className="h-full w-full flex items-center justify-center"
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={refetch} />
                        }>
                        <ActivityIndicator size={40} color="gray" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={style.mainContainer}>
                <ScrollView
                    className="h-screen"
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
                    <View
                        className="h-full w-full flex items-center justify-center"
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={refetch} />
                        }>
                        <Text>{error.message}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (!data.getRankList.status) {
        return (
            <SafeAreaView style={style.mainContainer}>
                <ScrollView
                    className="h-screen"
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
                    <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2 mb-1">
                        <Text className="font-bold text-2xl text-gray-600">Leaderboard</Text>
                        <Text className="font-bold text-lg text-gray-600">
                            {data.getRankList.title}
                        </Text>
                    </View>
                    <Text className="w-full text-center font-bold text-slate-700 text-lg">
                        {data.getRankList.message}
                    </Text>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={style.mainContainer}>
            <ScrollView
                className="h-screen"
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
                <View className="h-full">
                    <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2 mb-1">
                        <Text className="font-bold text-2xl text-gray-600">Leaderboard</Text>
                        <Text className="font-bold text-lg text-gray-600">
                            {data.getRankList.title}
                        </Text>
                    </View>

                    <View className="w-full rounded overflow-hidden space-y-1">
                        <View className="w-full flex flex-row justify-between bg-green-100 p-1 space-x-2 rounded">
                            <Text className="w-3/6 font-bold text-base">Name</Text>
                            <Text className="w-2/6 font-bold text-center text-base">Points</Text>
                            <Text className="w-1/6 font-bold text-center text-base">Rank</Text>
                        </View>
                        <View showsVerticalScrollIndicator={false}>
                            {data.getRankList.Submissions.map((item, idx) => {
                                return (
                                    <View
                                        key={idx}
                                        className="w-full flex flex-row justify-between bg-green-50 p-1 space-x-2 rounded">
                                        <Text className="w-3/6 font-bold">{item.name}</Text>
                                        <Text className="w-2/6 font-bold text-center">
                                            {item.marks}
                                        </Text>
                                        <Text className="w-1/6 font-bold text-center">
                                            {item.rank}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LeaderBoard;
