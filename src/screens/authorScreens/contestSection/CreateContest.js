import { SafeAreaView, ScrollView, Text, View, TextInput as Input } from 'react-native';
import React, { useRef } from 'react';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import moment from 'moment/moment';
import { FUNCTIONS } from '../../../helpers';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { CREATE_CONTEST_MUTATION } from '../../../graphql/query';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Pressable } from 'react-native';
import Loading from '../../../components/utilities/Loading';

const CreateContest = () => {
    const [input, setInput] = useState({});
    const [openDate, setOpenDate] = useState(false);
    const auth = useSelector(st => st.auth);
    const navigation = useNavigation();
    const richText = useRef();

    const [createContest, { loading, error, data }] = useMutation(CREATE_CONTEST_MUTATION);

    const handleCreate = () => {
        input.token = auth.token;
        input.start = input.start.toString();
        createContest({ variables: input });
    };

    if (!loading && data) {
        FUNCTIONS.showToast2(data.createContest.status, data.createContest.message);
        if (data.createContest.status) navigation.goBack();
    } else if (error) FUNCTIONS.showToast2(false, error.message);

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl text-gray-600">Contest Details</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="mt-1 flex space-y-2">
                        <View className="w-full rounded overflow-hidden border border-[#2B3467]">
                            <Text className="w-full bg-[#2B3467] font-bold text-white text-lg p-1">
                                Contest title
                            </Text>
                            <Input
                                value={input.title}
                                placeholder="Contest title"
                                className="text-base px-2"
                                onChangeText={text => setInput(pre => ({ ...pre, title: text }))}
                            />
                        </View>
                        <View className="w-full rounded overflow-hidden border border-[#2B3467]">
                            <Text className="w-full bg-[#2B3467] font-bold text-white text-lg p-1">
                                Contest description
                            </Text>
                            <RichEditor
                                className="p-[2px] bg-slate-300"
                                initialHeight={150}
                                placeholder="Question description..."
                                ref={richText}
                                initialContentHTML={input.description}
                                onChange={text => setInput(pre => ({ ...pre, description: text }))}
                            />
                            <RichToolbar
                                editor={richText}
                                actions={[
                                    actions.setBold,
                                    actions.setItalic,
                                    actions.setUnderline,
                                    actions.heading1,
                                    actions.insertBulletsList,
                                    actions.insertOrderedList,
                                    actions.checkboxList,
                                    actions.insertLink,
                                    actions.setStrikethrough,
                                    actions.removeFormat,
                                    actions.undo,
                                    actions.redo
                                ]}
                                iconMap={{
                                    [actions.heading1]: ({ tintColor }) => (
                                        <Text style={[{ color: tintColor }]}>H1</Text>
                                    )
                                }}
                            />
                        </View>
                        <View className="w-full rounded overflow-hidden border border-[#2B3467]">
                            <Text className="w-full bg-[#2B3467] font-bold text-white text-lg p-1">
                                Start time
                            </Text>
                            <TextInput
                                label="Start"
                                className="bg-white"
                                onTouchEnd={() => setOpenDate(true)}
                                activeUnderlineColor="rgb(34,197,94)"
                                value={moment
                                    .unix(input.start ? input.start : new Date().getTime() / 1000)
                                    .format('DD/MM/YYYY h:mm A')}
                                right={
                                    <TextInput.Icon
                                        icon="calendar"
                                        onPress={() => setOpenDate(true)}
                                    />
                                }
                            />
                            <DatePicker
                                date={
                                    new Date(
                                        input.start ? input.start * 1000 : new Date().getTime()
                                    )
                                }
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
                        </View>
                        <View className="w-full rounded overflow-hidden border border-[#2B3467]">
                            <Text className="w-full bg-[#2B3467] font-bold text-white text-lg p-1">
                                Contest duration (minutes)
                            </Text>
                            <Input
                                value={input.duration}
                                placeholder="Contest duration"
                                className="text-base px-2"
                                onChangeText={d =>
                                    setInput(pre => ({ ...pre, duration: parseInt(d) }))
                                }
                            />
                        </View>
                    </View>
                    <View className="w-full my-4">
                        <Pressable
                            className="bg-[#2B3467] p-2 rounded justify-center items-center"
                            onPress={handleCreate}>
                            <Text className="font-bold text-xl text-white">Create Now</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
            <Loading loading={loading} />
        </SafeAreaView>
    );
};

export default CreateContest;
