import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LiveContestCard from './LiveContestCard'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import ContestItem from '../Author/ContestItem';

const Live = () => {
    const [data, setData] = useState([]);
    const contestData = useSelector(st => st.contest.data);

    useEffect(() => {
        const upcoming = FUNCTIONS.filterContest(contestData, 'live');
        setData(upcoming);
    }, []);
    return (
        <View className='space-y-4 flex'>
            {data.map((item, idx) => (
                <ContestItem state='live' data={item} key={idx} />
            ))}
            <LiveContestCard/>
        </View>
    )
}

export default Live

const styles = StyleSheet.create({})