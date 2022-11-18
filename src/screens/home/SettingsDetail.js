import React from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, View} from 'react-native';
import {COLORS, ROUTES} from '../../constants';

const Settings = ({navigation}) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View className='flex h-screen justify-center items-center'>
                    <Text className="font-bold text-3xl">Coming Soon!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
});
