import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Question = ({ data, route }) => {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={() => navigation.navigate(route, { id: data.id })}
            className={`w-full flex-row mt-1 rounded overflow-hidden ${
                data.isSolved ? 'bg-green-100' : data.tried ? 'bg-red-100' : 'bg-slate-100'
            }`}>
            <View className="w-1/12 bg-[#2B3467]" />
            <View className="w-11/12 flex-col p-1">
                <View className="w-full">
                    <Text className="font-bold text-base text-[#2B3467]">{data.title}</Text>
                    <Text className="font-bold text-xs text-[#2B3467AA]">
                        Author: {data.User.name}
                    </Text>
                </View>
                <View className="w-full flex-row justify-between">
                    <Text>Solved: {data.solveCount}</Text>
                    <Text>Tried: {data.tried}</Text>
                    <Text>Marks: {data.marks}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default Question;
