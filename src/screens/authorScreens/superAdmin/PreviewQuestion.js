import {
    View,
    Text,
    useWindowDimensions,
    TextInput,
    TouchableOpacity,
    Pressable,
    ScrollView
} from 'react-native';
import React, { useState } from 'react';
import Wraper from '../../../components/utilities/Wraper';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import Card from '../../../components/utilities/Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GET_ALL_CONTEST_QUERY, GET_CONTEST_QUESTION_OPTION_QUERY } from '../../../graphql/query';
import Loading from '../../../components/utilities/Loading';
import RenderHTML from 'react-native-render-html';

const enums = {
    CONTEST: 'contest',
    QUESTION: 'question',
    OPEN: true,
    CLOSE: false
};

const PreviewQuestion = () => {
    const [open, setOpen] = useState({ contest: false, question: false });
    const [options, setOptions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedData, setSelectedData] = useState({});
    const { width } = useWindowDimensions();
    const auth = useSelector(st => st.auth);

    const { loading, data, refetch } = useQuery(GET_ALL_CONTEST_QUERY);
    const {
        loading: questionLoading,
        data: questionData,
        refetch: questionRefetch
    } = useQuery(GET_CONTEST_QUESTION_OPTION_QUERY, {
        variables: { id: selectedData.contest?.id }
    });

    const handleOpen = field => {
        setOpen(pre => ({ ...pre, [field]: !pre[field] }));
        if (field === enums.CONTEST) {
            setOptions(data.getAllContest?.map(item => ({ id: item.id, title: item.title })));
        } else if (field === enums.QUESTION) {
            setQuestions(questionData?.getContestQuestionOption?.Questions);
        }
    };
    const handleContestSearch = text => {
        const filteredOptions = data.getAllContest?.filter(opt =>
            opt.title.toLowerCase().includes(text.toLowerCase())
        );
        setOptions(filteredOptions);
    };

    const handleQuestionSearch = text => {
        const filteredQuestions = questionData?.getContestQuestionOption?.Questions?.filter(opt =>
            opt.title.toLowerCase().includes(text.toLowerCase())
        );
        setQuestions(filteredQuestions);
    };

    return (
        <>
            <Wraper head={'Preview Questions'} refresh={{ loading, refetch }}>
                <Card title="Select Contest">
                    <View className="w-full p-2 border rounded flex flex-row justify-between items-center">
                        {open.contest ? (
                            <TextInput
                                className="w-[90%] p-0 font-bold text-base m-0"
                                placeholder="Search..."
                                onChangeText={handleContestSearch}
                            />
                        ) : (
                            <Text
                                onPress={() => handleOpen(enums.CONTEST)}
                                className="font-bold text-base w-[90%]">
                                {selectedData.contest?.title
                                    ? selectedData.contest?.title
                                    : 'Select Contest'}
                            </Text>
                        )}
                        <TouchableOpacity onPress={() => handleOpen(enums.CONTEST)}>
                            <Icon
                                name={open.contest ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    {open.contest && (
                        <View className="max-h-[200px]">
                            <ScrollView
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={false}>
                                {options.map((item, idx) => (
                                    <Pressable
                                        key={idx}
                                        onPress={() => {
                                            handleOpen(enums.CONTEST);
                                            setSelectedData({
                                                contest: { id: item.id, title: item.title }
                                            });
                                        }}
                                        className="w-full p-2 bg-slate-400 mt-1 rounded">
                                        <Text className="w-full font-bold text-base">
                                            {item.title}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </Card>
                <Card title="Select Question" hidden={!selectedData.contest}>
                    <View className="w-full p-2 border rounded flex flex-row justify-between items-center">
                        {open.question ? (
                            <TextInput
                                className="w-[90%] p-0 font-bold text-base m-0"
                                placeholder="Search..."
                                onChangeText={handleQuestionSearch}
                            />
                        ) : (
                            <Text
                                onPress={() => handleOpen(enums.QUESTION)}
                                className="font-bold text-base w-[90%]">
                                {selectedData.question?.title
                                    ? selectedData.question?.title
                                    : 'Select Question'}
                            </Text>
                        )}
                        <TouchableOpacity onPress={() => handleOpen(enums.QUESTION)}>
                            <Icon
                                name={open.question ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    {open.question && (
                        <View className="max-h-[200px]">
                            <ScrollView
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={false}>
                                {questions.map((item, idx) => (
                                    <Pressable
                                        key={idx}
                                        onPress={() => {
                                            handleOpen(enums.QUESTION);
                                            questionRefetch();
                                            setSelectedData(pre => ({
                                                ...pre,
                                                question: item
                                            }));
                                        }}
                                        className="w-full p-2 bg-slate-400 mt-1 rounded">
                                        <Text className="w-full font-bold text-base">
                                            {item.title}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </Card>
                <Card title="Preview" hidden={!selectedData.question}>
                    <View className="w-full bg-slate-300 mb-1 p-2 rounded">
                        <Text className="font-bold border-b">Title</Text>
                        <Text className="">{selectedData.question?.title}</Text>
                    </View>
                    <View className="w-full bg-slate-300 mb-1 p-2 rounded">
                        <Text className="w-full font-bold border-b">Body</Text>
                        <RenderHTML
                            source={{ html: selectedData.question?.description }}
                            contentWidth={width}
                        />
                    </View>
                    <View className="w-full bg-slate-300 p-2 rounded">
                        <Text className="border-b font-bold">Options</Text>
                        {selectedData.question?.Options?.map((item, idx) => (
                            <Text className="w-full p-2 bg-slate-200 mt-1 rounded" key={idx}>
                                {item.value}
                            </Text>
                        ))}
                    </View>
                </Card>
            </Wraper>
            <Loading loading={loading || questionLoading} />
        </>
    );
};

export default PreviewQuestion;
