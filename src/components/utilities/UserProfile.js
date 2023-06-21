import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <View className="min-w-[220px] bg-slate-50 flex flex-row space-x-2 p-2 mx-1 rounded items-center divide-x-2 divide-slate-400">
            <View className="flex justify-center items-center">
                <Image
                    source={{ uri: process.env.BASE_URL + user.User.avatar }}
                    width={10}
                    height={10}
                    style={styles.profileImg}
                    className="rounded-full"
                />
            </View>
            <View className="px-2">
                <Text className="font-bold">{user.name}</Text>
                <View className="flex flex-row items-center">
                    <Text className="font-bold">Rank: </Text>
                    <Text className="font-bold text-base text-amber-600">{user.rank}</Text>
                </View>
                <View className="flex flex-row items-center">
                    <Text className="font-bold">Total Marks: </Text>
                    <Text className="font-bold text-base text-amber-600">{user.marks}</Text>
                </View>
            </View>
        </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    profileImg: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'green'
    }
});
