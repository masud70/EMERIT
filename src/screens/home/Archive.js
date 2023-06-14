import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import style from '../../../styles/style.scss';
import MapView from 'react-native-maps';

const About = () => {
    return (
        <SafeAreaView style={style.mainContainer}>
            <View className="w-full">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2 mb-1">
                    <Text className="font-bold text-2xl text-gray-600">About Us</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="w-full bg-slate-100 rounded overflow-hidden min-h-screen">
                    <Text className="w-full text-center text-white font-bold text-2xl bg-slate-800">
                        View us on Google Maps
                    </Text>
                    <View className="boder border-2 border-green-400">
                        <MapView
                            className="min-h-[200px]"
                            minZoomLevel={10}
                            initialRegion={{
                                latitude: 22.47056,
                                longitude: 91.78528,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default About;
