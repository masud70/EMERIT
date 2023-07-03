import { Text, View, TextInput as Input } from 'react-native';
import React, { useRef } from 'react';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import moment from 'moment/moment';
import { FUNCTIONS } from '../../../helpers';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { CREATE_CONTEST_MUTATION } from '../../../graphql/query';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import Loading from '../../../components/utilities/Loading';
import { useEffect } from 'react';
import Wraper from '../../../components/utilities/Wraper';
import Card from '../../../components/utilities/Card';
import FlatButton from '../../../components/utilities/FlatButton';
import { useNavigation } from '@react-navigation/native';

const CreateContest = () => {
    const [input, setInput] = useState({});
    const [openDate, setOpenDate] = useState(false);
    const auth = useSelector(st => st.auth);
    const navigation = useNavigation();
    const richText = useRef();

    const [createContest, { loading, data }] = useMutation(CREATE_CONTEST_MUTATION);

    const handleCreate = async () => {
        try {
            input.token = auth.token;
            input.start = input.start.toString();
            await createContest({ variables: input });
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    useEffect(() => {
        if (data) {
            FUNCTIONS.showToast2(data.createContest.status, data.createContest.message);
            if (data.createContest.status) navigation.goBack();
        }
    }, [data]);

    return (
        <>
            <Wraper head={'Contest Details'}>
                <View className="mb-10">
                    <Card title={'Contest title'}>
                        <Input
                            value={input.title}
                            placeholder="Contest title"
                            className="text-base py-1"
                            onChangeText={text => setInput(pre => ({ ...pre, title: text }))}
                        />
                    </Card>

                    <Card title={'Contest description'}>
                        <RichEditor
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
                    </Card>

                    <Card title={'Start time'}>
                        <TextInput
                            label="Start"
                            className="bg-white"
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
                    </Card>

                    <Card title={'Contest duration (minutes)'}>
                        <Input
                            value={input.duration}
                            placeholder="Contest duration"
                            className="text-base py-1"
                            onChangeText={d => setInput(pre => ({ ...pre, duration: parseInt(d) }))}
                        />
                    </Card>
                </View>

                <FlatButton title={'Create Now'} onPress={handleCreate} />
            </Wraper>
            <Loading loading={loading} />
        </>
    );
};

export default CreateContest;
