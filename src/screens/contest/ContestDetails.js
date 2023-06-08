import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native-gesture-handler';
import style from '../../../styles/style.scss';
import { useMutation, useQuery } from '@apollo/client';
import {
    CONTEST_REGISTRATION_MUTATION,
    GET_CONTEST_QUERY,
    GET_REGISTRATION_STATUS_QUERY
} from '../../graphql/query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import prettyMilliseconds from 'pretty-ms';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';

const ContestDetails = ({ route }) => {
    const [remaining, setRemaining] = useState('');
    const [state, setState] = useState(1);
    const auth = useSelector(a => a.auth);

    const { loading, error, data } = useQuery(GET_CONTEST_QUERY, {
        variables: { id: route.params.contestId }
    });

    const {
        loading: regLoading,
        error: regError,
        data: regData,
        refetch: regRefetch
    } = useQuery(GET_REGISTRATION_STATUS_QUERY, {
        variables: { id: route.params.contestId, token: auth.token }
    });

    const [register, { loading: mutationLoading, error: mutationError, data: mutationData }] =
        useMutation(CONTEST_REGISTRATION_MUTATION);

    const registerHandler = () => {
        const variables = {
            id: data.getContest.id,
            token: auth.token
        };
        register({ variables: variables });
    };

    useEffect(() => {
        if (!data) return;
        const timer = setInterval(() => {
            const now = new Date().getTime();
            let remainingTime = parseInt(data.getContest.start) * 1000 - now;

            if (now >= (parseInt(data.getContest.start) + data.getContest.duration * 60) * 1000) {
                setRemaining('Ended');
                setState(3);
            } else if (now >= parseInt(data.getContest.start) * 1000) {
                remainingTime =
                    (parseInt(data.getContest.start) + data.getContest.duration * 60) * 1000 - now;
                setRemaining(
                    prettyMilliseconds(remainingTime, {
                        secondsDecimalDigits: 0
                    })
                );
                setState(2);
            } else {
                setRemaining(
                    prettyMilliseconds(remainingTime, {
                        secondsDecimalDigits: 0
                    })
                );
                setState(1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [data]);

    useEffect(() => {
        if (mutationData) {
            FUNCTIONS.showToast2(
                mutationData.registration.status,
                mutationData.registration.message
            );
            regRefetch();
        }
    }, [mutationData]);

    return (
        <SafeAreaView style={style.mainContainer}>
            <View className="h-full" refreshControl={<RefreshControl />}>
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2 mb-1">
                    <Text className="font-bold text-2xl text-gray-600">Contest</Text>
                </View>
                {loading || error ? (
                    <Text>Loading...</Text>
                ) : (
                    <View className="w-full rounded overflow-hidden">
                        <ImageBackground
                            source={{ uri: 'https://picsum.photos/900' }}
                            className="w-full h-[140px]"
                        />
                        <View className="w-full bg-slate-700 p-1">
                            <Text className="text-white font-bold text-lg">
                                {data.getContest.title}
                            </Text>
                        </View>

                        <View className="w-11/12 p-1">
                            <View className="w-full flex flex-row items-center">
                                <View className="w-1/2 flex flex-row space-x-2 items-center">
                                    <Icon name="timetable" size={18} />
                                    <Text className="font-bold">
                                        {moment(parseInt(data.getContest.start) * 1000).format(
                                            'DD/MM/YYYY h:mm A'
                                        )}
                                    </Text>
                                </View>
                                <View className="w-1/2 flex flex-row space-x-2 items-center">
                                    <Icon name="timelapse" size={18} />
                                    <Text className="font-bold">
                                        {data.getContest.duration} minutes
                                    </Text>
                                </View>
                            </View>

                            <View className="w-full flex flex-row items-center">
                                <View className="w-1/2 flex flex-row space-x-2 items-center">
                                    <Icon name="timer-sand" size={18} />
                                    <Text className="font-bold">{remaining}</Text>
                                </View>
                                <View className="w-1/2 flex flex-row space-x-2 items-center">
                                    <Icon2 name="user" size={18} />
                                    <Text className="font-bold">{data.getContest.User.name}</Text>
                                </View>
                            </View>
                        </View>
                        <View className="w-full p-1 bg-slate-200 min-h-[50px]">
                            <Text>{data.getContest.description}</Text>
                        </View>
                        <View className="w-full my-1">
                            {regData && !regData.getRegistrationStatus.status ? (
                                <TouchableOpacity onPress={registerHandler} className="w-full">
                                    <Text
                                        className="w-full text-center p-1"
                                        style={[style.btn, style.bg_primary]}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            ) : state === 1 ? (
                                <Text
                                    className="w-full text-center p-1"
                                    style={[style.btn, style.bg_primary]}>
                                    Registered
                                </Text>
                            ) : (
                                <TouchableOpacity className="w-full">
                                    <Text
                                        className="w-full text-center p-1"
                                        style={[style.btn, style.bg_primary]}>
                                        {state === 2 ? 'Enter' : 'Practice'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ContestDetails;
