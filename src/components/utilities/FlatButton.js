import { Text } from 'react-native';
import React from 'react';
import { Pressable } from 'react-native';

const FlatButton = ({ title, onPress, style }) => {
    return (
        <Pressable
            className={['w-full bg-[#2B3467] rounded overflow-hidden', style].join(' ')}
            onPress={onPress}>
            <Text className="text-center font-bold text-lg text-white p-2">{title}</Text>
        </Pressable>
    );
};

export default FlatButton;
