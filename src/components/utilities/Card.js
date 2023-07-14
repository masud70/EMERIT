import { View, Text } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';

const Card = ({ title, children, rightIcon, onPress, hidden }) => {
    if (!rightIcon && !hidden) {
        return (
            <View className="w-full flex flex-col rounded overflow-hidden mb-2 border-2 border-[#2B3467]">
                <Text className="w-full font-bold text-lg text-white bg-[#2B3467] px-2 py-1">
                    {title}
                </Text>
                <View className="w-full p-2">{children}</View>
            </View>
        );
    } else if (!hidden) {
        return (
            <View className="w-full flex flex-col rounded overflow-hidden mb-2 border-2 border-[#2B3467]">
                <View className="w-full bg-[#2B3467] pl-2 flex flex-row items-center justify-between">
                    <Text className="font-bold text-base text-white">{title}</Text>
                    <IconButton
                        className="bg-gray-100"
                        icon={rightIcon}
                        size={15}
                        onPress={onPress}
                    />
                </View>
                <View className="w-full p-2">{children}</View>
            </View>
        );
    }
};

export default Card;
