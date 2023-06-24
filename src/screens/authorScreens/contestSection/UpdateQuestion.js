import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    RefreshControl
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { Pressable } from 'react-native';
import { useState } from 'react';
import {
    GET_ALL_QUESTION_BY_USER_ID_QUERY,
    GET_CONTEST_BY_CONTEST_ID_QUERY,
    UPDATE_CONTEST_QUESTION_MUTATION
} from '../../../graphql/query';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { ActivityIndicator } from 'react-native';
import { FUNCTIONS } from '../../../helpers';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const UpdateQuestion = ({ route }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [showOptions, setShowOptions] = useState([]);
    const auth = useSelector(st => st.auth);
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const { id } = route.params;

    const {
        loading: questionLoading,
        error: questionError,
        data: questionData
    } = useQuery(GET_ALL_QUESTION_BY_USER_ID_QUERY, { variables: { token: auth.token } });
    const { loading, error, data, refetch } = useQuery(GET_CONTEST_BY_CONTEST_ID_QUERY, {
        variables: { id: id }
    });
    const [updateNow, { loading: updateLoading, error: updateError, data: updateData }] =
        useMutation(UPDATE_CONTEST_QUESTION_MUTATION);

    const handleSearch = text => {
        if (text.length > 0) {
            setShowOptions(
                questionData.getAllQuestionByUserId.filter(item =>
                    item.title.toLowerCase().includes(text.toLowerCase())
                )
            );
        } else
            setShowOptions(
                questionData.getAllQuestionByUserId.map(item => ({
                    id: item.id,
                    title: item.title
                }))
            );
    };

    const handleOptionPress = option => {
        if (selectedOptions.map(item => item.id).includes(option.id)) {
            setSelectedOptions(pre => pre.filter(item => item.id !== option.id));
        } else {
            setSelectedOptions(pre => [...pre, option]);
        }
    };

    const handleOpen = () => {
        setOpen(pre => !pre);
        if (questionData) {
            const questions = questionData.getAllQuestionByUserId.map(item => ({
                id: item.id,
                title: item.title
            }));
            setShowOptions(questions);
        }
    };

    const handleUpdate = () => {
        updateNow({
            variables: {
                id: id,
                token: auth.token,
                questions: selectedOptions.map(item => item.id)
            }
        });
    };

    if (!updateLoading && updateData) {
        FUNCTIONS.showToast2(
            updateData.updateContestQuestion.status,
            updateData.updateContestQuestion.message
        );
        if (updateData.updateContestQuestion.status) navigation.goBack();
    }
    useEffect(() => {
        if (!loading && data) {
            const questions = data.getContestByContestId.Questions.map(item => ({
                id: item.id,
                title: item.title
            }));
            setSelectedOptions(questions);
            refetch();
        }
    }, [data]);

    if (questionLoading || questionError || loading || error) {
        return (
            <SafeAreaView className="w-full bg-white h-screen">
                <ScrollView>
                    <View className="px-2 py-1 w-screen bg-white">
                        <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                            <Text className="font-bold text-xl ">Update Question</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="w-full bg-white h-screen">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading || questionLoading} onRefresh={refetch} />
                }>
                <View className="px-2 py-1 w-screen bg-white">
                    <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                        <Text className="font-bold text-xl ">Update Question</Text>
                    </View>
                </View>
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <View className="w-full px-2">
                        <View className="w-full py-2 border-b mb-1">
                            <Text className="font-bold text-base text-center">Contest title</Text>
                        </View>
                        <View style={{ minHeight: height * 0.8 }} className={'w-full'}>
                            <View className="w-full p-2 border rounded flex flex-row justify-between items-center">
                                {open ? (
                                    <TextInput
                                        className="w-[90%] p-0 font-bold text-base m-0"
                                        placeholder="Search..."
                                        onChangeText={handleSearch}
                                    />
                                ) : (
                                    <Text
                                        onPress={handleOpen}
                                        className="font-bold text-base w-[90%]">
                                        Select Questions
                                    </Text>
                                )}
                                <TouchableOpacity onPress={handleOpen}>
                                    <Icon
                                        name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                className={`${
                                    !open ? 'h-0 border-0' : 'max-h-72 border border-t-0 mb-2'
                                } duration-700 transition-all overflow-hidden rounded-b p-1`}>
                                <ScrollView
                                    nestedScrollEnabled={true}
                                    showsVerticalScrollIndicator={false}>
                                    {showOptions.map((option, idx) => (
                                        <Pressable
                                            key={idx}
                                            onPress={() => handleOptionPress(option)}
                                            className="w-full p-2 pr-1 flex flex-row justify-between items-center mb-1 bg-[#2b346720] rounded">
                                            <Text className="text-base">{option.title}</Text>
                                            <Icon
                                                name="check-circle"
                                                size={22}
                                                color={
                                                    selectedOptions
                                                        .map(item => item.id)
                                                        .includes(option.id)
                                                        ? '#6F1E51'
                                                        : '#778ca3'
                                                }
                                            />
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>
                            <View className="w-full">
                                <Text className="font-bold text-base p-2 border rounded">
                                    Selected Questions{' '}
                                    {selectedOptions.length
                                        ? '(' + selectedOptions.length + ')'
                                        : ''}
                                </Text>
                            </View>
                            <View className="w-full">
                                <ScrollView
                                    nestedScrollEnabled={true}
                                    showsVerticalScrollIndicator={false}
                                    className="overflow-hidden rounded-b p-1 max-h-80 border border-t-0">
                                    {selectedOptions.length === 0 ? (
                                        <Text className="text-center font-base">
                                            No question(s) selected
                                        </Text>
                                    ) : (
                                        selectedOptions.map((option, idx) => (
                                            <View
                                                className="w-full p-2 pr-1 flex flex-row justify-between items-center mb-1 bg-[#2b346720] rounded"
                                                key={idx}>
                                                <Text className="w-full text-base">
                                                    {idx + 1 + '. ' + option.title}
                                                </Text>
                                            </View>
                                        ))
                                    )}
                                </ScrollView>
                            </View>
                        </View>
                        <Pressable
                            onPress={handleUpdate}
                            className="w-full bg-[#2B3467] p-2 my-2 rounded items-center">
                            {updateLoading ? (
                                <ActivityIndicator size={25} />
                            ) : (
                                <Text className="font-bold text-white text-lg">Save Now</Text>
                            )}
                        </Pressable>
                    </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdateQuestion;
