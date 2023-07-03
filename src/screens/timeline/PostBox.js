import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import {
    CREATE_COMMENT_MUTATION,
    CREATE_REACTION_MUTATION,
    DELETE_POST
} from '../../graphql/postQuery';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import { BASE_URL } from '@env';

const PostBox = ({ data, refetch }) => {
    const auth = useSelector(state => state.auth);
    const [commentVisibility, setCommentVisibility] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');
    const { width } = useWindowDimensions();

    const [submitReaction, { data: reactionData }] = useMutation(CREATE_REACTION_MUTATION);
    const [submitComment, { data: commentData }] = useMutation(CREATE_COMMENT_MUTATION);
    const [deletePost, { data: deletePostData }] = useMutation(DELETE_POST);

    const handleDeletePost = async () => {
        try {
            const result = await deletePost({ variables: { token: auth.token, id: data.id } });
            console.log('Result: ', result);
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    const handleSubmitComment = async () => {
        try {
            if (comment.length > 0) {
                await submitComment({
                    variables: {
                        token: auth.token,
                        id: data.id,
                        body: comment
                    }
                });
            }
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    useEffect(() => {
        if (deletePostData) {
            FUNCTIONS.showToast2(
                deletePostData.deletePost.status,
                deletePostData.deletePost.message
            );
            setShowModal(pre => !pre);
            if (deletePostData.deletePost.status) refetch();
        }
    }, [deletePostData]);
    useEffect(() => {
        if (reactionData) {
            console.log(reactionData);
            refetch();
        }
    }, [reactionData]);
    useEffect(() => {
        if (commentData) {
            refetch();
            setComment('');
        }
    }, [commentData]);

    return (
        <View className="w-full bg-slate-200 mb-2 rounded overflow-hidden">
            <View className="w-full flex flex-row items-center bg-slate-300 p-2">
                <View className="w-1/6 border-r border-slate-400">
                    <Avatar.Image
                        className="overflow-hidden p-0 m-0 items-center justify-center border-green-400 border-2"
                        source={{ uri: BASE_URL + data.User.avatar }}
                        size={45}
                    />
                </View>
                <Pressable
                    onLongPress={() => setShowModal(pre => !pre)}
                    className="w-5/6 flex pl-2">
                    <Text className="font-bold w-full">{data.User.name}</Text>
                    <Text className="text-small w-full text-gray-500">
                        {moment(parseInt(data.time)).fromNow()}
                    </Text>
                </Pressable>
                <Modal
                    avoidKeyboard
                    isVisible={showModal}
                    onBackdropPress={() => setShowModal(pre => !pre)}
                    onBackButtonPress={() => setShowModal(pre => !pre)}>
                    <View className="w-full bg-white rounded overflow-hidden px-2 py-6 flex items-center">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View className="w-full flex flex-col justify-center items-center space-y-2">
                                <Pressable
                                    onPress={handleDeletePost}
                                    className="min-w-[80%] items-center bg-red-500 rounded p-1">
                                    <Text className="w-full text-center text-white font-bold text-lg">
                                        Delete
                                    </Text>
                                </Pressable>
                                <Pressable className="min-w-[80%] items-center bg-blue-500 rounded p-1">
                                    <Text className="w-full text-center text-white font-bold text-lg">
                                        Edit
                                    </Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
            <View className="w-full px-2 py-1">
                <RenderHTML source={{ html: data.body }} contentWidth={width} />
            </View>
            <View className="w-full flex flex-row bg-slate-300 p-2">
                <Pressable
                    onPress={() => {
                        submitReaction({
                            variables: {
                                id: data.id,
                                token: auth.token,
                                type: 'like'
                            }
                        });
                    }}
                    className="w-2/6 flex flex-row justify-center items-center space-x-1">
                    <Icon name="thumbs-o-up" size={20} />
                    <Text className="font-bold">{data.likes}</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        submitReaction({
                            variables: {
                                id: data.id,
                                token: auth.token,
                                type: 'dislike'
                            }
                        });
                    }}
                    className="w-2/6 flex flex-row justify-center items-center space-x-1">
                    <Icon name="thumbs-o-down" size={20} />
                    <Text className="font-bold">{data.dislikes}</Text>
                </Pressable>
                <Pressable
                    onPress={() => setCommentVisibility(pre => !pre)}
                    className="w-2/6 flex flex-row justify-center items-center space-x-1">
                    <Icon name="comment-o" size={20} />
                    <Text className="font-bold">{data.Comments.length}</Text>
                </Pressable>
            </View>
            <View className={`${!commentVisibility && 'hidden'}`}>
                <TextInput
                    placeholder="Write your comment here..."
                    mode="outlined"
                    value={comment}
                    returnKeyType="go"
                    onSubmitEditing={handleSubmitComment}
                    onChangeText={val => setComment(val)}
                    right={<TextInput.Icon icon="send" onPress={handleSubmitComment} />}
                />
                <View className="w-full">
                    {data.Comments.map((item, idx) => (
                        <View key={idx} className="w-full flex flex-row space-x-2 my-1">
                            <View className="w-1/12 pt-1 mr-2">
                                <Avatar.Image
                                    className="overflow-hidden p-0 m-0 items-center justify-center border"
                                    source={{ uri: BASE_URL + item.User.avatar }}
                                    size={40}
                                />
                            </View>
                            <View className="max-w-[86%] px-3 py-1 bg-slate-300 rounded-xl">
                                <Text className="w-full text-sm font-bold">{item.User.name}</Text>
                                <Text className="w-full text-sm">{item.body}</Text>
                                <Text className="w-full text-xs text-[10px]">
                                    {moment(parseInt(item.time)).fromNow()}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default PostBox;
