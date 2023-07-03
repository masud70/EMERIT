import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import prettyMilliseconds from 'pretty-ms';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useMutation } from '@apollo/client';
import { DELETE_CONTEST } from '../../graphql/contestMutation';
import { FUNCTIONS } from '../../helpers';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native';
import Loading from '../../components/utilities/Loading';

const Item = ({ data, route, refetch }) => {
    const [remaining, setRemaining] = useState('');
    const [state, setState] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const auth = useSelector(st => st.auth);

    const [deleteContest, { loading }] = useMutation(DELETE_CONTEST);

    const deleteHandler = async () => {
        try {
            const result = await deleteContest({
                variables: { token: auth.token, id: data.id }
            });
            const {
                deleteContest: { status, message }
            } = result.data;
            setShowModal(false);
            FUNCTIONS.showToast2(status, message);
            if (status) refetch();
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };
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
        <>
            <Pressable
                onPress={() => navigation.navigate(route, { contestId: data.id })}
                onLongPress={() => setShowModal(true)}>
                <View className="w-full flex flex-row bg-green-200 rounded overflow-hidden mb-1">
                    <View
                        className={`w-1/12 ${
                            state === 1
                                ? 'bg-green-600'
                                : state === 2
                                ? 'bg-red-500'
                                : 'bg-slate-700'
                        }  p-1 flex items-center justify-center`}></View>
                    <View className="w-11/12 p-1">
                        <View className="w-full flex flex-row border-b border-slate-400 mb-1 items-center">
                            <View className="w-[6%]">
                                <Icon
                                    name={data.privacy === 'private' ? 'lock' : 'earth'}
                                    size={18}
                                />
                            </View>
                            <Text className="w-[94%] font-bold text-lg">{data.title}</Text>
                        </View>

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
            <Modal
                avoidKeyboard
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
                onBackButtonPress={() => setShowModal(false)}>
                <View className="w-full bg-white rounded overflow-hidden px-2 py-6 flex items-center">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="w-full flex flex-col justify-center items-center space-y-2">
                            <Pressable
                                onPress={deleteHandler}
                                className="min-w-[80%] items-center bg-red-500 rounded p-1">
                                <Text className="w-full text-center text-white font-bold text-lg">
                                    Delete Contest
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <Loading loading={loading} />
        </>
    );
};

export default Item;
