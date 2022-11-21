import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserProfile = ({user}) => {
    return (
        <View className=' w-52 bg-slate-50 flex flex-row space-x-2 p-2 mx-1 rounded items-center divide-x-2 divide-slate-400'>
            <View className='flex justify-center items-center'>
                <Image source={require('../../assets/user.jpg')} width={10} height={10} style={styles.profileImg} className='rounded-full'/>
                <Text className='font-bold text-lg'>{user.name}</Text>
            </View>
            <View className='px-2'>
                <View className='flex flex-row items-center'>
                    <Text className='font-bold'>Rank: </Text>
                    <Text className='font-bold text-lg text-amber-600'>{user.rank}</Text>
                </View>
                <View className='flex flex-row items-center'>
                    <Text className='font-bold'>Solve Count: </Text>
                    <Text className='font-bold text-lg text-lime-600'>{user.solved}</Text>
                </View>
                <View className='flex flex-row items-center'>
                    <Text className='font-bold'>Total Points: </Text>
                    <Text className='font-bold text-lg text-amber-600'>{user.point}</Text>
                </View>
            </View>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    profileImg: {
        width: 50,
        height: 50
    }
})