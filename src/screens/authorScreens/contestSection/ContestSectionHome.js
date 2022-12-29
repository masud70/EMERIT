import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ContestSectionHome = () => {

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl ">
                        Contest Dashboard
                    </Text>
                </View>
                <ScrollView>
                    <TouchableOpacity className="w-full bg-gray-200 justify-center items-center rounded p-1 mt-1">
                        <Text className="font-bold text-lg text-green-500">
                            Create A New Contest
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ContestSectionHome;

const styles = StyleSheet.create({});
