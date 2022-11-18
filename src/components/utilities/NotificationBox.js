import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificationBox = () => {
    return (
        <View className='w-full bg-slate-200 my-1 rounded-lg overflow-hiddenj px-2 py-2 divide-x-2 flex flex-row space-x-2 divide-gray-300 items-center'>
            <View className=''>
                <Image source={require('../../assets/user.jpg')} className='w-10 h-10 rounded-full'/>
                <View className='w-3 h-3 rounded-full bg-orange-600 absolute'/>
            </View>
            <View className='w-10/12 pl-2'>
                <View className='w-ful'>
                    <Text>Lorem ipsum dolor sit amet consectetur adipi sicing elit. Ea, possi mus.</Text>
                </View>
                <View className='w-full items-end'>
                    <Text className='text-xs'>1h 2m ago</Text>
                </View>
            </View>
        </View>
    )
}

export default NotificationBox

const styles = StyleSheet.create({})