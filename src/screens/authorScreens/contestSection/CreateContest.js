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
import { CONSTANT, ROUTES } from '../../../constants';

const CreateContest = () => {
    const [data, setData] = useState({});
    const [openDate, setOpenDate] = useState(false);
    const [animator, setAnimator] = useState(false);
    const auth = useSelector(st => st.auth);
    const navigation = useNavigation();

    const handleCreate = () => {
        setAnimator(true);
        const url = CONSTANT.SERVER_URL + 'contest/create';
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            },
            body: JSON.stringify(data)
        })
            .then(r => r.json())
            .then(res => {
                FUNCTIONS.showToast2(res.status, res.message);
                if (res.status) {
                    setData({});
                    navigation.navigate(ROUTES.AUTHOR_CONTEST);
                }
            })
            .catch(err => FUNCTIONS.showToast2(false, err.message))
            .finally(() => setAnimator(false));
    };

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl text-gray-600">Contest Details</Text>
                </View>
                <ScrollView>
                    <View className="space-y-1 mt-1">
                        <TextInput
                            label="Contest title"
                            className="bg-gray-100 rounded"
                            value={data.title}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text => setData(pre => ({ ...pre, title: text }))}
                        />
                        <TextInput
                            label="Description"
                            className="bg-gray-100 rounded"
                            value={data.description}
                            multiline
                            numberOfLines={4}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text => setData(pre => ({ ...pre, description: text }))}
                        />
                        <TextInput
                            label="Start"
                            className="bg-gray-100"
                            onTouchEnd={() => setOpenDate(true)}
                            activeUnderlineColor="rgb(34,197,94)"
                            value={moment
                                .unix(data.start ? data.start : new Date().getTime() / 1000)
                                .format('DD/MM/YYYY h:mm A')}
                            right={
                                <TextInput.Icon icon="calendar" onPress={() => setOpenDate(true)} />
                            }
                        />
                        <DatePicker
                            date={new Date(data.start ? data.start * 1000 : new Date().getTime())}
                            modal
                            open={openDate}
                            mode="datetime"
                            activeUnderlineColor="rgb(34,197,94)"
                            onConfirm={date => {
                                setOpenDate(false);
                                setData(pre => ({
                                    ...pre,
                                    start: date.getTime() / 1000
                                }));
                            }}
                            onCancel={() => {
                                setOpenDate(false);
                            }}
                        />
                        <TextInput
                            label={'Duration (minutes)'}
                            className="bg-gray-100"
                            value={data.duration}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={d => setData(pre => ({ ...pre, duration: d }))}
                        />
                    </View>
                    <View className="w-full my-4">
                        <TouchableOpacity
                            className="bg-green-500 p-2 rounded justify-center items-center"
                            onPress={handleCreate}>
                            <Text className="font-bold text-xl text-white">Create Now</Text>
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
