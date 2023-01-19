import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LiveContestCard from './LiveContestCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import LiveContestItem from './LiveContestItem';

const Live = () => {
    const [data, setData] = useState([]);
    const contestData = useSelector(st => st.contest.contestData);

    useEffect(() => {
        // console.log(contestData);
        const filtered = FUNCTIONS.filterContest(contestData, 'live');
        setData(filtered);
    }, []);

    return (
        <View className="space-y-4 flex">
            {data.map((item, idx) => (
                <LiveContestItem state="live" data={item} key={idx} />
            ))}
            {/* <LiveContestCard /> */}
        </View>
    );
};

export default Live;

const styles = StyleSheet.create({});
