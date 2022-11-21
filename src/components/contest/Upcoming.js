import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UpcomingContestCard from './UpcomingContestCard'

const Upcoming = () => {
    return (
        <View className='space-y-4 flex'>
            <UpcomingContestCard/>
            <UpcomingContestCard/>
            <UpcomingContestCard/>
            <UpcomingContestCard/>
            <UpcomingContestCard/>
        </View>
    )
}

export default Upcoming

const styles = StyleSheet.create({})