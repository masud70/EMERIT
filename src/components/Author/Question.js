import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Question = ({ data }) => {
    return (
        <View
            className={`w-full flex-row mt-1 rounded overflow-hidden ${
                data.solved ? 'bg-green-100' : data.tried ? 'bg-red-100' : 'bg-slate-100'
            }`}>
            <View className="w-1/12 bg-gray-700"></View>
            <View className="w-11/12 flex-col p-1">
                <View className="w-full">
                    <Text className="font-bold">{data.title}</Text>
                </View>
                <View className="w-full flex-row justify-between">
                    <Text>Solved: 150</Text>
                    <Text>Tried: 270</Text>
                    <Text>Points: 10</Text>
                </View>
            </View>
        </View>
    );
};

export default Question;

const styles = StyleSheet.create({});
