import { Dimensions, RefreshControl, SafeAreaView, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { CONSTANT, ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setContestData } from '../../redux/state/contestSlice';
import { io } from 'socket.io-client';
const { width, height } = Dimensions.get('window');
import style from '../../../styles/style.scss';
import Item from '../../components/contest/Item';
import { useQuery } from '@apollo/client';
import { GET_ALL_CONTEST_QUERY } from '../../graphql/query';
import { ActivityIndicator } from 'react-native';
const socket = io(CONSTANT.BASE_URL, { transports: ['websocket'] });

const Contest = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { loading, error, data, refetch } = useQuery(GET_ALL_CONTEST_QUERY);

    const loadContest = () => {
        const url = CONSTANT.BASE_URL + '/contest/getAll';
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
                    dispatch(setContestData({ data: res.data }));
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        loadContest();
    }, []);

    useEffect(() => {
        socket.off('loadContest').on('loadContest', () => loadContest());
    }, [socket]);

    if (error) console.log(error.message);

    return (
        <SafeAreaView style={style.mainContainer}>
            <View className="h-full">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2 mb-1">
                    <Text className="font-bold text-2xl text-gray-600">Contest</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className='h-screen'
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
                    {loading ? (
                        <ActivityIndicator size={40} color="gray" />
                    ) : error ? (
                        <Text className="w-full text-center font-bold text-lg text-slate-700 p-4">
                            {error.message}
                        </Text>
                    ) : (
                        data.getAllContest.map((item, idx) => (
                            <Item data={item} key={idx} route={ROUTES.CONTEST_DETAILS} />
                        ))
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Contest;
