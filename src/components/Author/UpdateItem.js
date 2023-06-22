import { View, Text, ActivityIndicator, TextInput as Input, Pressable } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import React, { useEffect } from 'react';
import { UPDATE } from '../../graphql/contestMutation';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import { useMutation } from '@apollo/client';
import { useRef } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useState } from 'react';

const UpdateItem = ({
    field,
    value,
    onUpdate,
    placeholder,
    detail,
    contestId,
    refetch,
    password
}) => {
    const [openDate, setOpenDate] = useState(false);
    const auth = useSelector(state => state.auth);
    const richText = useRef();

    const [update, { loading, error, data: updData }] = useMutation(UPDATE);

    useEffect(() => {
        if (!loading && !error && updData) {
            FUNCTIONS.showToast2(updData.update.status, updData.update.message);
            if (updData.update.status) refetch();
        }
    }, [updData]);

    return (
        <View className="w-full rounded overflow-hidden bg-[#00000006] flex flex-col my-4">
            {field === 'description' ? (
                <View className="">
                    <RichEditor
                        className="p-[2px] bg-slate-300"
                        initialHeight={150}
                        placeholder="Contest description..."
                        ref={richText}
                        initialContentHTML={value}
                        onChange={text =>
                            onUpdate(pre => ({
                                ...pre,
                                description: text
                            }))
                        }
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
            ) : field === 'start' ? (
                <View className="">
                    <TextInput
                        label="Start"
                        className="bg-gray-100"
                        onTouchEnd={() => setOpenDate(true)}
                        activeUnderlineColor="rgb(34,197,94)"
                        value={moment.unix(parseInt(value)).format('DD/MM/YYYY h:mm A')}
                        right={<TextInput.Icon icon="calendar" onPress={() => setOpenDate(true)} />}
                    />
                    <DatePicker
                        date={value ? new Date(parseInt(value) * 1000) : new Date()}
                        modal
                        open={openDate}
                        mode="datetime"
                        activeUnderlineColor="rgb(34,197,94)"
                        onConfirm={date => {
                            setOpenDate(false);
                            onUpdate(pre => ({
                                ...pre,
                                start: (date.getTime() / 1000).toString()
                            }));
                        }}
                        onCancel={() => {
                            setOpenDate(false);
                        }}
                    />
                </View>
            ) : field === 'privacy' ? (
                <View>
                    <RadioButton.Group
                        value={value}
                        onValueChange={p => onUpdate(pre => ({ ...pre, privacy: p }))}>
                        <RadioButton.Item label="Public" value="public" />
                        <RadioButton.Item label="Private" value="private" />
                    </RadioButton.Group>
                    {value === 'private' && (
                        <Input
                            className="p-2 text-lg border-t border-[#2B34675A]"
                            placeholder="Password"
                            value={password}
                            onChangeText={pass => onUpdate(pre => ({ ...pre, password: pass }))}
                        />
                    )}
                </View>
            ) : (
                <View>
                    <Input
                        value={value}
                        placeholder={placeholder}
                        className="p-2 text-lg"
                        onChangeText={text => onUpdate(pre => ({ ...pre, [field]: text }))}
                    />
                </View>
            )}

            <View className="flex flex-row justify-between items-center bg-[#2b346710]">
                <View className="w-3/4 p-1">
                    <Text className="text-[#2B3467] text-base">{detail}</Text>
                </View>
                <View className="w-1/4 p-1 bg-[#2B3467]">
                    {loading ? (
                        <ActivityIndicator size={30} />
                    ) : (
                        <Pressable
                            className="w-full"
                            onPress={() => {
                                update({
                                    variables: {
                                        id: contestId,
                                        field: field,
                                        value:
                                            field === 'privacy' && value === 'private'
                                                ? value + '<<@>>' + password
                                                : value,
                                        token: auth.token
                                    }
                                });
                            }}>
                            <Text className="w-full text-center text-lg text-white font-bold">
                                Update
                            </Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
};

export default UpdateItem;
