import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';

const UpcomingContestCard = () => {
    return (
        <View className='bg-slate-100 my-1 rounded p-2 space-y-3'>
            <View className='flex flex-row justify-between items-center'>
                <View className='w-9/12 max-h-12'>
                    <Text className='font-bold text-base text-black'>EMERIT Preliminary Contest - 01  Lorem ipsum dolor sit amet</Text>
                </View>
                <View className='flex flex-row py-1 px-2 rounded-xl space-x-1' style={styles.points}>
                    <View className='flex flex-row items-center'>
                        <Icon name='gift-sharp' size={15} color='#F400A1'/>
                        <Text className='font-bold'>50</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                        <Icon name='logo-bitcoin' size={15} color='#E25822'/>
                        <Text className='font-bold'>20</Text>
                    </View>
                </View>
            </View>
            <View className='px-0'>
                <View className='flex flex-row justify-center items-center h-10 bg-slate-200 rounded'>
                    <Text className='font-bold text-base'>Remaining : </Text>
                    <Text className='font-bold text-base'>1d 2h 33m 45s</Text>
                </View>
            </View>
            <View className=''>
                <TouchableOpacity className='bg-green-700 w-full rounded-2xl py-1 items-center'>
                    <Text className='font-bold text-lg text-gray-200'>Register Now</Text>
                </TouchableOpacity>
                {/* <View className='bg-green-900 w-full rounded-2xl py-1 items-center'>
                    <Text className='font-bold text-lg text-gray-400'>Registered</Text>
                </View> */}
            </View>
            <View className='flex flex-row justify-between divide-x-2 divide-slate-300 border-t-slate-200 border-t-2 items-center py-1 pt-2'>
                <View className='flex flex-row justify-center items-center space-x-1 w-1/2'>
                    <Icon name='calendar-sharp' size={17}/>
                    <Text className='font-bold'>21 Nov, 11</Text>
                </View>
                <View className='flex flex-row justify-center items-center space-x-1 w-1/2'>
                    <Icon name='time-sharp' size={17}/>
                    <Text className='font-bold'>8:00 PM</Text>
                </View>
            </View>
        </View>
    )
}

export default UpcomingContestCard

const styles = StyleSheet.create({
    points: {
        backgroundColor: COLORS.bgColor
    }
})