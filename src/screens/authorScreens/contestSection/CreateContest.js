import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import moment from 'moment/moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FUNCTIONS } from '../../../helpers';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants';

const CreateContest = () => {
    const [data, setData] = useState({});
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [animator, setAnimator] = useState(false);
    const user = useSelector(st => st.auth);
    const navigation = useNavigation();

    const handleCreate = () => {
        let dataToSend = {};
        const { start, end, title, description } = data;
        if (start && end && title) {
            setAnimator(true);
            dataToSend.description = description;
            dataToSend.start = moment(start).toString();
            dataToSend.end = moment(end).toString();
            dataToSend.title = title;
            FUNCTIONS.createContest(dataToSend, user.token)
                .then(res => {
                    FUNCTIONS.showToast(
                        res.status ? 'success' : 'error',
                        res.status ? 'Success' : 'Error',
                        res.message
                    );
                    if (res.status) {
                        setData({});
                        navigation.navigate(ROUTES.AUTHOR_CONTEST);
                    }
                })
                .catch(err => {
                    FUNCTIONS.showToast('error', 'Error', err.message);
                })
                .finally(() => {
                    setAnimator(false);
                });
        } else {
            FUNCTIONS.showToast(
                'info',
                'Warning',
                'Title, start and end time are required.'
            );
        }
    };

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl text-gray-600">
                        Contest Details
                    </Text>
                </View>
                <ScrollView>
                    <View className="space-y-1 mt-1">
                        <TextInput
                            label="Contest title"
                            className="bg-gray-100 rounded"
                            value={data.title}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setData(pre => ({ ...pre, title: text }))
                            }
                        />
                        <TextInput
                            label="Description"
                            className="bg-gray-100 rounded"
                            value={data.description}
                            multiline
                            numberOfLines={4}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text =>
                                setData(pre => ({ ...pre, description: text }))
                            }
                        />
                        <TextInput
                            label="Start"
                            className="bg-gray-100"
                            onTouchEnd={() => setOpenDate(true)}
                            activeUnderlineColor="rgb(34,197,94)"
                            value={
                                data.start
                                    ? moment(data.start).format(
                                          'DD/MM/YYYY h:mm A'
                                      )
                                    : ''
                            }
                            right={
                                <TextInput.Icon
                                    name="calendar"
                                    color="#000"
                                    onPress={() => setOpenDate(true)}
                                />
                            }
                        />
                        <DatePicker
                            date={data.start ? data.start : new Date()}
                            modal
                            open={openDate}
                            mode="datetime"
                            activeUnderlineColor="rgb(34,197,94)"
                            onConfirm={date => {
                                setOpenDate(false);
                                setData(pre => ({
                                    ...pre,
                                    start: date
                                }));
                            }}
                            onCancel={() => {
                                setOpenDate(false);
                            }}
                        />
                        <TextInput
                            label={'End'}
                            className="bg-gray-100"
                            onTouchEnd={() => setOpenTime(true)}
                            activeUnderlineColor="rgb(34,197,94)"
                            value={
                                data.end
                                    ? moment(data.end).format(
                                          'DD/MM/YYYY h:mm A'
                                      )
                                    : ''
                            }
                            right={
                                <TextInput.Icon
                                    name="calendar"
                                    color="#000"
                                    onPress={() => setOpenTime(true)}
                                />
                            }
                        />
                        <DatePicker
                            date={data.end ? data.end : new Date()}
                            modal
                            open={openTime}
                            mode="datetime"
                            onConfirm={time => {
                                setOpenTime(false);
                                setData(pre => ({
                                    ...pre,
                                    end: time
                                }));
                            }}
                            onCancel={() => {
                                setOpenTime(false);
                            }}
                        />
                        <TextInput
                            label={'Duration (minutes)'}
                            className="bg-gray-100"
                            value={moment(data.end)
                                .diff(moment(data.start), 'minutes')
                                .toString()}
                            activeUnderlineColor="rgb(34,197,94)"
                            editable={false}
                        />
                    </View>
                    <View className="w-full my-4">
                        <TouchableOpacity
                            className="bg-green-500 p-2 rounded justify-center items-center"
                            onPress={handleCreate}>
                            <Text className="font-bold text-xl text-white">
                                Create Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View
                className={`absolute bg-gray-100 h-screen w-screen items-center ${
                    !animator ? 'hidden' : ''
                } justify-center`}>
                <ActivityIndicator color="red" animating={animator} size={60} />
            </View>
        </SafeAreaView>
    );
};

export default CreateContest;

const styles = StyleSheet.create({});
