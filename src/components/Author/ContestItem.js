import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment/moment';
import prettyMilliseconds from 'pretty-ms';
import { useEffect } from 'react';
import { useState } from 'react';
import * as Progress from 'react-native-progress';
import { COLORS, ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { FUNCTIONS } from '../../helpers';
import { useSelector } from 'react-redux';

const ContestItem = ({ data, mode }) => {
    const [item, setItem] = useState({});
    const auth = useSelector(st => st.auth);
    const navigation = useNavigation();
    const [state, setState] = useState('');

    const register = () => {
        FUNCTIONS.registerContest(item, auth.token)
            .then(res => {
                console.log(res);
                FUNCTIONS.showToast2(res.status, res.message);
            })
            .catch(err => {
                FUNCTIONS.showToast2(false, err.message);
            });
    };
    const calcState = (start, duration) => {
        const now = new Date().getTime() / 1000;
        const startInt = parseInt(start);
        const durationInt = parseInt(duration);
        const st =
            now < startInt
                ? 'Upcoming'
                : startInt + durationInt * 60 < now
                ? 'Ended'
                : startInt + durationInt * 60 > now
                ? 'Live'
                : '';
        setState(p => st);
    };
    const calcRemaining = (start, duration, state) => {
        const now = new Date().getTime();
        const startInt = parseInt(start) * 1000;
        const durationInt = parseInt(duration) * 60000;
        return state === 'Upcoming'
            ? startInt - now
            : state === 'Live'
            ? startInt + durationInt - now
            : 0;
    };

    useEffect(() => {
        setItem(data);

        let interval = setInterval(() => {
            calcState(data.start, data.duration);
            setItem(pre => ({
                ...pre,
                remaining: prettyMilliseconds(
                    calcRemaining(data.start, data.duration, state),
                    {
                        secondsDecimalDigits: 0
                    }
                )
            }));
            if (state === 'Ended') clearInterval(interval);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View className="rounded overflow-hidden my-1">
            <ImageBackground
                source={{ uri: 'https://picsum.photos/900' }}
                className="w-full h-[140px]"
            />
            <View className="w-full bg-gray-600 p-1">
                <Text className="font-bold text-xl text-gray-50">
                    {data.title}
                </Text>
            </View>
            <View className="bg-green-100 p-1">
                <View className="w-full flex flex-row">
                    <View className="w-2/6">
                        <Text className="text-base text-gray-600">Start</Text>
                    </View>
                    <View className="w-4/6">
                        <Text className="text-base text-gray-600">
                            :{' '}
                            {moment(parseInt(data.start) * 1000).format(
                                'DD/MM/YYYY h:mm A'
                            )}
                        </Text>
                    </View>
                </View>
                <View className="w-full flex flex-row">
                    <View className="w-2/6">
                        <Text className="text-base text-gray-600">
                            Duration
                        </Text>
                    </View>
                    <View className="w-4/6">
                        <Text className="text-base text-gray-600">
                            : {data.duration} minutes
                        </Text>
                    </View>
                </View>
                <View className="w-full flex flex-row">
                    <View className="w-2/6">
                        <Text className="text-base text-gray-600">
                            {state === 'Live' ? 'Running' : 'Remaining'}
                        </Text>
                    </View>
                    <View className="w-4/6">
                        <Text className="text-base text-gray-600 font-bold">
                            :{' '}
                            {state !== 'Ended'
                                ? prettyMilliseconds(
                                      calcRemaining(
                                          data.start,
                                          data.duration,
                                          state
                                      ),
                                      {
                                          secondsDecimalDigits: 0
                                      }
                                  )
                                : state}
                        </Text>
                    </View>
                </View>
                {state === 'Live' && (
                    <View className="w-full py-2">
                        <Progress.Bar
                            progress={
                                calcRemaining(
                                    data.start,
                                    data.duration,
                                    state
                                ) /
                                (parseInt(data.duration) * 60000)
                            }
                            className="w-full"
                            width={370}
                            color={COLORS.primary}
                        />
                    </View>
                )}
                <View className="w-full flex flex-row justify-around">
                    <TouchableOpacity className="bg-green-500 px-4 rounded min-w-[145px] items-center">
                        <Text className="font-bold text-lg text-white">
                            View Details
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            mode === 'admin'
                                ? navigation.navigate(
                                      ROUTES.AUTHOR_CONTEST_EDIT,
                                      {
                                          data
                                      }
                                  )
                                : register();
                        }}
                        className={`${
                            state === 'Live' ? 'bg-red-500' : 'bg-green-500'
                        } px-4 rounded min-w-[145px] items-center`}>
                        <Text className="font-bold text-lg text-white">
                            {mode === 'admin'
                                ? 'Edit'
                                : state == 'Ended'
                                ? 'Practice'
                                : state === 'Live'
                                ? 'Enter'
                                : 'Register'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {state === 'Ended' && (
                    <View className="w-full items-center my-1">
                        <TouchableOpacity className="bg-green-500 px-4 rounded min-w-[140px] items-center w-11/12">
                            <Text className="font-bold text-lg text-white">
                                View Leaderboard
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View className="bg-gray-200 py-1 px-2 flex flex-row items-center justify-between divide-x-2 divide-gray-400">
                <View className="w-1/2 flex flex-row justify-center items-center">
                    <Icon name="person" size={15} />
                    <Text>{100}</Text>
                </View>
                <View className="w-1/2 items-center">
                    <Text>@{data.username}</Text>
                </View>
            </View>
        </View>
    );
};

export default ContestItem;

const styles = StyleSheet.create({});
