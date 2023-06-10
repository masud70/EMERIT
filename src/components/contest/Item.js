import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import prettyMilliseconds from 'pretty-ms';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

const Item = ({ data, route }) => {
    const [remaining, setRemaining] = useState('');
    const [state, setState] = useState(1);
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            let remainingTime = parseInt(data.start) * 1000 - now;

            if (now >= (parseInt(data.start) + data.duration * 60) * 1000) {
                setRemaining('Ended');
                setState(3);
            } else if (now >= parseInt(data.start) * 1000) {
                remainingTime = (parseInt(data.start) + data.duration * 60) * 1000 - now;
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

    return (
        <Pressable onPress={() => navigation.navigate(route, { contestId: data.id })}>
            <View className="w-full flex flex-row bg-green-200 rounded overflow-hidden mb-1">
                <View
                    className={`w-1/12 ${
                        state === 1 ? 'bg-green-600' : state === 2 ? 'bg-red-500' : 'bg-slate-700'
                    }  p-1 flex items-center justify-center`}></View>
                <View className="w-11/12 p-1">
                    <Text className="w-full font-bold text-lg border-b border-slate-400 mb-1">
                        {data.title}
                    </Text>
                    <View className="w-full flex flex-row space-x-2 items-center">
                        <Icon name="timetable" size={18} />
                        <Text className="font-bold">
                            {moment(parseInt(data.start) * 1000).format('DD/MM/YYYY h:mm A')}
                        </Text>
                    </View>

                    <View className="w-full flex flex-row items-center">
                        <View className="w-1/2 flex flex-row space-x-2 items-center">
                            <Icon name="timelapse" size={18} />
                            <Text className="font-bold">{data.duration} minutes</Text>
                        </View>

                        <View className="w-1/2 flex flex-row space-x-2 items-center">
                            <Icon name="timer-sand" size={18} />
                            <Text className="font-bold">{remaining}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default Item;
