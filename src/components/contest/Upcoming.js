import { StyleSheet, View } from 'react-native';
import React from 'react';
import UpcomingContestCard from './UpcomingContestCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { FUNCTIONS } from '../../helpers';
import { useSelector } from 'react-redux';
import ContestItem from '../Author/ContestItem';

const Upcoming = () => {
    const [data, setData] = useState([]);
    const contestData = useSelector(st => st.contest.data);

    useEffect(() => {
        const upcoming = FUNCTIONS.filterContest(contestData, 'upcoming');
        setData(upcoming);
    }, []);
    return (
        <View className="space-y-4 flex">
            {data.map((item, idx) => (
                <ContestItem state="upcoming" data={item} key={idx} />
            ))}
            <UpcomingContestCard />
        </View>
    );
};

export default Upcoming;

const styles = StyleSheet.create({});
