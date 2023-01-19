import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Section = ({ route, data }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(route)}>
            <View className="w-full bg-green-100 flex flex-row justify-center rounded overflow-hidden min-h-[80px] mt-1">
                <View className="w-1/6 justify-center bg-green-500 items-center p-2">
                    <Icon name="trophy" size={35} color={'rgb(55, 65, 82)'} />
                </View>
                <View className="w-5/6 bg-gray-700 px-2">
                    <View>
                        <Text className="text-white text-xl font-bold">
                            {data.sectionName}
                        </Text>
                    </View>
                    <View>
                        <Text className="text-white">Contest Details</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Section;

const styles = StyleSheet.create({});
