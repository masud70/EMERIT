import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LiveContestCard from './LiveContestCard'

const Live = () => {
    return (
        <View className='space-y-4 flex'>
            <LiveContestCard/>
            <LiveContestCard/>
            <LiveContestCard/>
            <LiveContestCard/>
        </View>
    )
}

export default Live

const styles = StyleSheet.create({})