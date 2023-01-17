import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { CONSTANT, ROUTES } from '../../../constants';
import ContestItem from '../../../components/Author/ContestItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setUserContestData } from '../../../redux/state/contestSlice';
import { ActivityIndicator } from 'react-native';

const ContestSectionHome = () => {
    const [contestData, setContestData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let auth = useSelector(st => st.auth);

    const loadContest = () => {
        const url = CONSTANT.SERVER_URL + 'contest/getUserContest';
        setLoading(true);
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            }
        })
            .then(r => r.json())
            .then(res => {
                console.log(res);
                if (res.status) {
                    dispatch(setUserContestData({ data: res.data }));
                    setContestData(res.data);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadContest();
    }, []);

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl ">
                        Contest Dashboard
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <TouchableOpacity
                            className="w-full bg-gray-200 justify-center items-center rounded p-1 mt-1"
                            onPress={() =>
                                navigation.navigate(
                                    ROUTES.AUTHOR_CONTEST_CREATE
                                )
                            }>
                            <Text className="font-bold text-lg text-green-500">
                                Create A New Contest
                            </Text>
                        </TouchableOpacity>
                        <View className="">
                            {!loading && contestData.Contests ? (
                                contestData.Contests.map((item, idx) => (
                                    <ContestItem
                                        data={{
                                            ...item,
                                            username: contestData.username,
                                            name: contestData.name,
                                            userId: contestData.id
                                        }}
                                        key={idx}
                                        mode="admin"
                                    />
                                ))
                            ) : (
                                <ActivityIndicator
                                    className="mt-10"
                                    size={40}
                                    color="gray"
                                />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ContestSectionHome;

const styles = StyleSheet.create({});
