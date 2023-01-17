import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { Avatar, IconButton } from 'react-native-paper';
import { useState } from 'react';
import { CONSTANT } from '../../../constants';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../../helpers';

const PostComment = ({ show, postData }) => {
    const [comment, setComment] = useState('');
    const auth = useSelector(state => state.auth);
    const post = useSelector(state => state.post);

    const submitComment = () => {
        const url = CONSTANT.SERVER_URL + 'post/postComment';
        if (comment.length === 0) return;
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            },
            body: JSON.stringify({ body: comment, postId: postData.id })
        })
            .then(r => r.json())
            .then(res => {
                if (res.status) {
                    setComment('');
                }
                FUNCTIONS.showToast2(res.status, res.message);
            })
            .catch(err => {
                FUNCTIONS.showToast2(false, err.message);
            });
    };

    return (
        <View
            className={`p-1 border-t border-gray-400 ${!show ? 'hidden' : ''}`}>
            <View className="w-full flex flex-row focus:border rounded-md border-gray-400 mb-1">
                <TextInput
                    className="w-[90%] py-0 m-0 px-3"
                    placeholder="Write your comment..."
                    onChangeText={setComment}
                    value={comment}
                    multiline
                />
                <IconButton
                    icon="send"
                    className="w-[10%]"
                    size={20}
                    onPress={submitComment}
                />
            </View>
            <View className="w-full border-t border-gray-300 divide-y divide-gray-200">
                {postData.comments.map((item, idx) => {
                    return (
                        <View
                            className="flex flex-row items-center py-1"
                            key={idx}>
                            <View className="w-[10%]">
                                <Avatar.Image
                                    className="border-spacing-2 border-2 items-center justify-center overflow-hidden border-green-300"
                                    size={35}
                                    source={{
                                        uri:
                                            CONSTANT.SERVER_URL +
                                            item.User.avatar
                                    }}
                                />
                            </View>
                            <View className="w-[90%]">
                                <Text className="text-gray-700">
                                    {item.body}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default PostComment;

const styles = StyleSheet.create({});
