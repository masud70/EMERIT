import { View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Question from '../../../components/Author/Question';
import { useQuery } from '@apollo/client';
import { GET_USER_QUESTIONS } from '../../../graphql/contestQuery';
import Wraper from '../../../components/utilities/Wraper';
import { FAB } from 'react-native-paper';
import FlatButton from '../../../components/utilities/FlatButton';

const QuestionSectionHome = () => {
    const [questions, setQuestions] = useState([]);
    const navigation = useNavigation();
    let auth = useSelector(st => st.auth);

    const { loading, data, refetch } = useQuery(GET_USER_QUESTIONS, {
        variables: { token: auth.token }
    });

    useEffect(() => {
        if (!loading && data) {
            setQuestions(data.getUserQuestions);
        }
    }, [data]);

    return (
        <>
            <Wraper head="Question Dashboard" refresh={{ loading: loading, refetch: refetch }}>
                <FlatButton
                    title="Create A New Question"
                    onPress={() => navigation.navigate(ROUTES.AUTHOR_QUESTION_CREATE)}
                />
                <View>
                    {questions.map((item, idx) => (
                        <Question route={ROUTES.AUTHOR_QUESTION_EDIT} data={item} key={idx} />
                    ))}
                </View>
            </Wraper>
            <FAB
                variant="surface"
                icon="plus"
                className="m-5 absolute right-0 bottom-0"
                onPress={() => navigation.navigate(ROUTES.AUTHOR_QUESTION_CREATE)}
            />
        </>
    );
};

export default QuestionSectionHome;
