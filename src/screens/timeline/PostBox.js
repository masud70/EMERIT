import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, TextInput } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT_MUTATION, CREATE_REACTION_MUTATION } from '../../graphql/postQuery';
import { useSelector } from 'react-redux';
import { BASE_URL } from '@env';

const PostBox = ({ data, refetch }) => {
    const auth = useSelector(state => state.auth);
    const [commentVisibility, setCommentVisibility] = useState(false);
    const [comment, setComment] = useState('');
    const { width } = useWindowDimensions();

    const [submitReaction, { loading: reactionLoading, error: reactionError, data: reactionData }] =
        useMutation(CREATE_REACTION_MUTATION);
    const [submitComment, { loading: commentLoading, error: commentError, data: commentData }] =
        useMutation(CREATE_COMMENT_MUTATION);

    const handleSubmitComment = () => {
        if (comment.length > 0) {
            submitComment({
                variables: {
                    token: auth.token,
                    id: data.id,
                    body: comment
                }
            });
        }
    };

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
                <View className="w-5/6 flex pl-2">
                    <Text className="font-bold w-full">{data.User.name}</Text>
                    <Text className="text-small w-full text-gray-500">
                        {moment(parseInt(data.time)).fromNow()}
                    </Text>
                </View>
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
                    onChangeText={val => setComment(val)}
                    right={<TextInput.Icon icon="send" onPress={handleSubmitComment} />}
                />
                <View className="w-full">
                    {data.Comments.map((item, idx) => (
                        <View
                            key={idx}
                            className="w-full flex flex-row items-center space-x-2 my-1">
                            <View className="w-1/12">
                                <Avatar.Image
                                    className="overflow-hidden p-0 m-0 items-center justify-center border-green-400 border-2"
                                    source={{ uri: BASE_URL + item.User.avatar }}
                                    size={40}
                                />
                            </View>
                            <View className="w-11/12 pl-2">
                                <Text className="w-full text-sm">{item.body}</Text>
                                <Text className="w-full text-xs">
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
