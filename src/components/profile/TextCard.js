import { Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const TextCard = ({ data }) => {
    return (
        <View className="w-full bg-slate-200 flex flex-row items-center space-x-2 rounded-lg mb-2 p-1">
            <View className="bg-slate-100 h-10 w-10 items-center justify-center rounded-full">
                <Icon name={data.icon} size={20} color={'#F49D1A'} />
            </View>
            <View>
                <Text className="font-bold text-slate-400 text-xs">{data.title}</Text>
                <Text className="font-bold text-base">{data.value}</Text>
            </View>
        </View>
    );
};

export default TextCard;
