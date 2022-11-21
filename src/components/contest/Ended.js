import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EndedContestCard from './EndedContestCard'

const Ended = () => {
    return (
        <View className='space-y-4 flex'>
            <EndedContestCard/>
            <EndedContestCard/>
            <EndedContestCard/>
            <EndedContestCard/>
        </View>
    )
}

export default Ended;

const styles = StyleSheet.create({})