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

const ContestItem = ({ data, state, mode }) => {
    const [item, setItem] = useState({});
    const [dr, setDr] = useState({ d: 1, r: 0 });
    const user = useSelector(st => st.auth);
    const navigation = useNavigation();

    const register = () => {
        FUNCTIONS.registerContest(item, user.token)
            .then(res => {
                console.log(res);
                FUNCTIONS.showToast(
                    res.status ? 'success' : 'error',
                    res.status ? 'Success' : 'Error',
                    res.message
                );
            })
            .catch(err => {
                FUNCTIONS.showToast('error', 'Error', err.message);
            });
    };

    useEffect(() => {
        const dur = moment(data.end).diff(moment(data.start), 'miliseconds');
        setItem({ ...data, duration: prettyMilliseconds(dur) });
        setDr(pre => ({ ...pre, d: dur }));

        let interval;
        const startTime = state === 'live' ? data.end : data.start;
        let r = moment(startTime).diff(moment(), 'miliseconds');
        if (r > 0) {
            interval = setInterval(() => {
                r = moment(startTime).diff(moment(), 'miliseconds');
                setItem(pre => ({
                    ...pre,
                    remaining: prettyMilliseconds(r, {
                        secondsDecimalDigits: 0
                    })
                }));
                setDr(pre => ({ ...pre, r: r }));
                if (r <= 0) {
                    clearInterval(interval);
                    setItem(pre => ({ ...pre, remaining: 'Ended' }));
                    state = state === 'upcoming' ? 'live' : 'ended';
                }
            }, 1000);
        } else {
            setItem(pre => ({ ...pre, remaining: 'Ended' }));
        }
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
                    {item.title}
                </Text>
            </View>
            <View className="bg-green-100 p-1">
                <View className="w-full flex flex-row">
                    <View className="w-2/6">
                        <Text className="text-base text-gray-600">Start</Text>
                    </View>
                    <View className="w-4/6">
                        <Text className="text-base text-gray-600">
                            : {moment(data.start).format('DD/MM/YYYY h:mm A')}
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
                            : {item.duration}
                        </Text>
                    </View>
                </View>
                <View className="w-full flex flex-row">
                    <View className="w-2/6">
                        <Text className="text-base text-gray-600">
                            Remaining
                        </Text>
                    </View>
                    <View className="w-4/6">
                        <Text className="text-base text-gray-600 font-bold">
                            : {item.remaining}
                        </Text>
                    </View>
                </View>
                {state === 'live' && (
                    <View className="w-full py-2">
                        <Progress.Bar
                            progress={dr.r / dr.d}
                            className="w-full"
                            width={360}
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
                            state === 'live' ? 'bg-red-500' : 'bg-green-500'
                        } px-4 rounded min-w-[145px] items-center`}>
                        <Text className="font-bold text-lg text-white">
                            {mode === 'admin'
                                ? 'Edit'
                                : state == 'ended'
                                ? 'Practice'
                                : state === 'live'
                                ? 'Enter'
                                : 'Register'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {state === 'ended' && (
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
                    <Text>{item.regCount}</Text>
                </View>
                <View className="w-1/2 items-center">
                    <Text>@{item.username}</Text>
                </View>
            </View>
        </View>
    );
};

export default ContestItem;

const styles = StyleSheet.create({});
