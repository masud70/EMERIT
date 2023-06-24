import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { CONSTANT, ROUTES } from '../../../constants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Question from '../../../components/Author/Question';
import { RefreshControl } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_USER_QUESTIONS } from '../../../graphql/contestQuery';

const QuestionSectionHome = () => {
    const [questions, setQuestions] = useState([]);
    const navigation = useNavigation();
    let auth = useSelector(st => st.auth);

    const { loading, error, data, refetch } = useQuery(GET_USER_QUESTIONS, {
        variables: { token: auth.token }
    });

    useEffect(() => {
        if (!loading && data) {
            setQuestions(data.getUserQuestions);
            console.log(auth.token);
        }
    }, [data]);

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl ">Question Dashboard</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
                    <View>
                        <TouchableOpacity
                            className="w-full bg-gray-200 justify-center items-center rounded p-1 mt-1"
                            onPress={() => navigation.navigate(ROUTES.AUTHOR_QUESTION_CREATE)}>
                            <Text className="font-bold text-lg text-green-500">
                                Create A New Question
                            </Text>
                        </TouchableOpacity>

                        <View className="">
                            {!loading && questions ? (
                                questions.map((item, idx) => <Question data={item} key={idx} />)
                            ) : (
                                <ActivityIndicator className="mt-10" size={40} color="gray" />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default QuestionSectionHome;

const styles = StyleSheet.create({});
