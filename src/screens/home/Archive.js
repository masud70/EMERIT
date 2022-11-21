import React from 'react';
import {Dimensions, FlatList, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import CategoryCard from '../../components/utilities/CategoryCard';
import NotificationBox from '../../components/utilities/NotificationBox';
import {COLORS} from '../../constants';

const Notifications = () => {
    const {width, height} = Dimensions.get('window');
    const columns = Math.ceil(width/230);
    const data = [
        {key: 1},
        {key: 2},
        {key: 3},
        {key: 4},
        {key: 5},
        {key: 5},
        {key: 5},
        {key: 5},
        {key: 5},
        {key: 5},
        {key: 5},
        {key: 5},
    ]
    const renderFunction = ({item, idx}) => {
        return (
            <CategoryCard/>
        )
    }

    return (
        <ImageBackground source={require('../../assets/bg/2.png')} width={width} height={height} resizeMode="cover" className='h-full'>
            <SafeAreaView className='px-2 pt-2 mb-20'>
                <View className='h-10 flex items-center justify-center rounded  border-b-2 border-b-slate-600'>
                    <Text className='font-bold text-2xl text-white'>Archive</Text>
                </View>
                <View className='w-full justify-center items-center'>
                    <FlatList
                        data = {data}
                        renderItem={renderFunction}
                        keyExtractor={(it, id)=>id.toString()}
                        numColumns={columns}
                    />
                </View>
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
