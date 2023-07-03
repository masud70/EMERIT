import { Pressable, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { DELETE_QUESTION } from '../../graphql/contestMutation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { FUNCTIONS } from '../../helpers';
import { useMutation } from '@apollo/client';

const Question = ({ data, route, refetch }) => {
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const auth = useSelector(st => st.auth);

    const [deleteQuestion, { loading }] = useMutation(DELETE_QUESTION);

    const deleteHandler = async () => {
        try {
            const result = await deleteQuestion({
                variables: { token: auth.token, id: data.id }
            });
            const {
                deleteQuestion: { status, message }
            } = result.data;
            setShowModal(false);
            FUNCTIONS.showToast2(status, message);
            if (status) refetch();
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    return (
        <>
            <Pressable
                onPress={() => navigation.navigate(route, { id: data.id })}
                onLongPress={() => setShowModal(true)}
                className={`w-full flex-row mt-1 rounded overflow-hidden ${
                    data.isSolved ? 'bg-green-100' : data.tried ? 'bg-red-100' : 'bg-slate-100'
                }`}>
                <View className="w-1/12 bg-[#2B3467]" />
                <View className="w-11/12 flex-col p-1">
                    <View className="w-full">
                        <Text className="font-bold text-base text-[#2B3467]">{data.title}</Text>
                        <Text className="font-bold text-xs text-[#2B3467AA]">
                            Author: {data.User.name}
                        </Text>
                    </View>
                    <View className="w-full flex-row justify-between">
                        <Text>Solved: {data.solveCount}</Text>
                        <Text>Tried: {data.tried}</Text>
                        <Text>Marks: {data.marks}</Text>
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
                                    Delete Question
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
};

export default Question;
