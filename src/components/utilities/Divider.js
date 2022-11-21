import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Divider = ({text, css}) => {
    return (
        <View className='flex w-fit h-fit flex-row justify-center items-center text-lg'>
            <View className='flex-1 border-t-2 border-gray-400'/>
            <View className='px-2'>
                <Text className={css}>{text}</Text>
            </View>
            <View className='flex-1 border-t-2 border-gray-400'/>
        </View>
    )
}

export default Divider;

const styles = StyleSheet.create({})