import { Pressable, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';

const Input = ({ placeholder, value, onChangeText, rightIcon, onPress, iconColor, loading }) => {
    if (rightIcon) {
        return (
            <View className="flex flex-row items-center">
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    className="px-2 py-1 border rounded-l border-r-0 w-[88%]"
                />
                {loading ? (
                    <View className="w-[12%] border h-full rounded-r items-center flex-row justify-center">
                        <ActivityIndicator size={30} />
                    </View>
                ) : (
                    <Pressable
                        onPress={onPress}
                        className="w-[12%] border h-full rounded-r items-center flex-row justify-center">
                        <Icon name={rightIcon} size={30} color={iconColor} />
                    </Pressable>
                )}
            </View>
        );
    } else {
        return (
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className="px-2 py-1 border rounded text-base"
            />
        );
    }
};

export default Input;
