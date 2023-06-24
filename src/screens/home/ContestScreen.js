import {
    ActivityIndicator,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    View
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CONTEST_QUESTION_OPTION_QUERY, SUBMIT_ANSWER_MUTATION } from '../../graphql/query';
import style from '../../../styles/style.scss';
import QuestionItem from '../../components/contest/QuestionItem';
import { Pressable } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import prettyMilliseconds from 'pretty-ms';
import { useNavigation } from '@react-navigation/native';
import { FUNCTIONS } from '../../helpers';
import Loading from '../../components/utilities/Loading';

const ContestScreen = ({ route }) => {
    const [remaining, setRemaining] = useState('');
    const [answer, setAnswer] = useState([]);
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();

    const { loading, error, data, refetch } = useQuery(GET_CONTEST_QUESTION_OPTION_QUERY, {
        variables: { id: route.params.id }
    });

    const [submitAnswer, { loading: submitLoading, error: submitError, data: submitData }] =
        useMutation(SUBMIT_ANSWER_MUTATION);

    const handleSubmit = () => {
        const ids = Object.keys(answer).join('<<::>>');
        const values = Object.values(answer).join('<<::>>');

        const variables = {
            id: route.params.id,
            token: auth.token,
            answers: ids + '>>::<<' + values
        };
        submitAnswer({ variables: variables });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            let remainingTime = parseInt(data.getContestQuestionOption.start) * 1000 - now;

            if (
                now >=
                (parseInt(data.getContestQuestionOption.start) +
                    data.getContestQuestionOption.duration * 60) *
                    1000
            ) {
                setRemaining('Ended');
            } else if (now >= parseInt(data.getContestQuestionOption.start) * 1000) {
                remainingTime =
                    (parseInt(data.getContestQuestionOption.start) +
                        data.getContestQuestionOption.duration * 60) *
                        1000 -
                    now;
                setRemaining(
                    prettyMilliseconds(remainingTime, {
                        secondsDecimalDigits: 0
                    })
                );
            } else {
                setRemaining(
                    prettyMilliseconds(remainingTime, {
                        secondsDecimalDigits: 0
                    })
                );
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [data]);

    useEffect(() => {
        if (submitData) {
            FUNCTIONS.showToast2(submitData.submitAnswer.status, submitData.submitAnswer.message);
            if (submitData.submitAnswer.status) navigation.goBack();
        }
    }, [submitData]);

    return (
        <SafeAreaView style={style.mainContainer}>
            <View className="h-full pb-16">
                {loading || error ? (
                    <ActivityIndicator className="mt-10" size={40} color="gray" />
                ) : (
                    <View className="pb-1">
                        <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2 mb-1">
                            <Text className="font-bold text-xl text-gray-500">
                                {data.getContestQuestionOption.title}
                            </Text>
                            <Text className="w-full text-center text-base">
                                Remaining: {remaining}
                            </Text>
                        </View>
                        <ScrollView
                            className="flex flex-col mb-3"
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={loading} onRefresh={refetch} />
                            }>
                            {data.getContestQuestionOption.Questions.map((item, idx) => {
                                return (
                                    <QuestionItem
                                        data={{ ...item, sl: idx }}
                                        answer={answer}
                                        setAnswer={setAnswer}
                                        key={idx}
                                    />
                                );
                            })}
                            <View className="w-full">
                                <Pressable
                                    onPress={handleSubmit}
                                    className="bg-green-500 p-2 rounded">
                                    <Text style={style.btn}>Finish</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </View>
            <Loading loading={submitLoading} />
        </SafeAreaView>
    );
};

export default ContestScreen;
