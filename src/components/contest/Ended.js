import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EndedContestCard from './EndedContestCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import { useEffect } from 'react';
import ContestItem from '../Author/ContestItem';

const Ended = () => {
    const [data, setData] = useState([]);
    const contestData = useSelector(st => st.contest.data);

    useEffect(() => {
        const ended = FUNCTIONS.filterContest(contestData, 'ended');
        setData(ended);
    }, []);
    return (
        <View className="space-y-4 flex">
            {data.map((item, idx) => (
                <ContestItem state={'ended'} data={item} key={idx} />
            ))}
            <EndedContestCard />
        </View>
    );
};

export default Ended;

const styles = StyleSheet.create({});
