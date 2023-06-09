import { SafeAreaView, ScrollView, Text, View } from 'react-native';
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
import { useMutation } from '@apollo/client';
import { CREATE_CONTEST_MUTATION } from '../../../graphql/query';

const CreateContest = () => {
    const [input, setInput] = useState({});
    const [openDate, setOpenDate] = useState(false);
    const auth = useSelector(st => st.auth);
    const navigation = useNavigation();

    const [createContest, { loading, error, data }] = useMutation(CREATE_CONTEST_MUTATION);

    const handleCreate = () => {
        input.token = auth.token;
        input.start = input.start.toString();
        createContest({ variables: input });
    };

    if (!loading && data) {
        FUNCTIONS.showToast2(data.createContest.status, data.createContest.message);
        navigation.navigate(ROUTES.AUTHOR_CONTEST);
    } else if (error) FUNCTIONS.showToast2(false, error.message);

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
                            value={input.title}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text => setInput(pre => ({ ...pre, title: text }))}
                        />
                        <TextInput
                            label="Description"
                            className="bg-gray-100 rounded"
                            value={input.description}
                            multiline
                            numberOfLines={4}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={text => setInput(pre => ({ ...pre, description: text }))}
                        />
                        <TextInput
                            label="Start"
                            className="bg-gray-100"
                            onTouchEnd={() => setOpenDate(true)}
                            activeUnderlineColor="rgb(34,197,94)"
                            value={moment
                                .unix(input.start ? input.start : new Date().getTime() / 1000)
                                .format('DD/MM/YYYY h:mm A')}
                            right={
                                <TextInput.Icon icon="calendar" onPress={() => setOpenDate(true)} />
                            }
                        />
                        <DatePicker
                            date={new Date(input.start ? input.start * 1000 : new Date().getTime())}
                            modal
                            open={openDate}
                            mode="datetime"
                            activeUnderlineColor="rgb(34,197,94)"
                            onConfirm={date => {
                                setOpenDate(false);
                                setInput(pre => ({
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
                            value={input.duration}
                            activeUnderlineColor="rgb(34,197,94)"
                            onChangeText={d => setInput(pre => ({ ...pre, duration: parseInt(d) }))}
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
                    !loading ? 'hidden' : ''
                } justify-center`}>
                <ActivityIndicator color="red" animating={loading} size={60} />
            </View>
        </SafeAreaView>
    );
};

export default CreateContest;
