import React from 'react';
import {Dimensions, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import NotificationBox from '../../components/utilities/NotificationBox';
import {COLORS} from '../../constants';

const {width, height} = Dimensions.get('window');

const Notifications = () => {
    return (
        <ImageBackground source={require('../../assets/bg/2.png')} width={width} height={height} resizeMode="cover" className='h-full'>
            <SafeAreaView className='px-2 pt-2'>
                <View className='h-10 flex items-center justify-center rounded  border-b-2 border-b-slate-600'>
                    <Text className='font-bold text-2xl text-white'>Notifications</Text>
                </View>
                <ScrollView className='mb-10'>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                    <NotificationBox/>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
    }
});
