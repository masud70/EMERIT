import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import React from 'react';

const EditContest = ({ route }) => {
    const { data } = route.params;
    console.log(data);
    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl ">Edit Contest</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="rounded overflow-hidden my-1">
                        <ImageBackground
                            source={{ uri: 'https://picsum.photos/900' }}
                            className="w-full h-[140px]"
                        />
                        <View className="w-full bg-gray-600 p-1">
                            <Text className="font-bold text-xl text-gray-50">
                                {data.title}
                            </Text>
                        </View>
                        <View>
                            
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default EditContest;

const styles = StyleSheet.create({});
