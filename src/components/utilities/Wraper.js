import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';

const Wraper = ({ head, children, refresh }) => {
    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refresh.loading} onRefresh={refresh.refetch} />
                }>
                <View className="h-screen px-2 py-1 w-screen bg-white">
                    <View className="w-full items-center justify-center border-b-4 border-[#2B3467] bg-[#2b3467ea] rounded p-2 mb-1">
                        <Text className="font-bold text-xl text-white">{head}</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Wraper;
