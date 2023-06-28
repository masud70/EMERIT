import { Pressable, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/style.scss';

const Section = ({ route, data }) => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.navigate(route)} className="w-full items-center pb-3">
            <View
                className="w-full bg-white flex flex-col shadow-xl rounded overflow-hidden mt-1"
                style={styles.shadow}>
                <View className="w-full h-36 justify-center items-center p-2">
                    <Icon name={data.icon} size={70} color={'#654E92'} />
                    <Text className="text-[#2B3467] text-2xl font-bold">{data.sectionName}</Text>
                </View>
                <View className="w-full bg-[#2B3467] px-2 pb-1">
                    <View>
                        <Text className="text-white text-xl font-bold">{data.sectionName}</Text>
                    </View>
                    <View>
                        <Text className="text-white">{data.sectionName} Details</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default Section;
