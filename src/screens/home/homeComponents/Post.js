import { StyleSheet, Text, View } from 'react-native';
import { useWindowDimensions } from 'react-native';

import RenderHtml from 'react-native-render-html';
import React from 'react';
import { useState } from 'react';
import PostComment from './PostComment';
import moment from 'moment';
import { CONSTANT } from '../../../constants';
import { useSelector } from 'react-redux';

const Post = ({ data }) => {
    const [showComment, setShowComment] = useState(false);
    const auth = useSelector(state => state.auth);
    const { width } = useWindowDimensions();

    const reactionHander = reactionType => {
        const url = CONSTANT.SERVER_URL + 'post/reaction';
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            },
            body: JSON.stringify({ type: reactionType, postId: data.id })
        })
            .then(r => r.json())
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <View className="w-full bg-gray-50 bg-opacity-60 rounded overflow-hidden mb-1">
            <View className="w-full bg-gray-700 px-2 py-1">
                <Text className="text-white">{data.User.name}</Text>
                <View className="flex flex-row justify-between">
                    <Text className="text-gray-300 text-xs">
                        @{data.User.username}
                    </Text>
                    <Text className="text-gray-300 text-xs">
                        {moment.unix(parseInt(data.time)).fromNow()}
                    </Text>
                </View>
            </View>
            <View className="px-2 py-1">
                <RenderHtml contentWidth={width} source={{ html: data.body }} />
            </View>
            <View className="w-full bg-gray-200 p-1 divide-x divide-gray-400 border-gray-400 border-t flex flex-row justify-around">
                <View className="w-2/6 items-center">
                    <Text
                        onPress={() => reactionHander('like')}
                        className="p-1">
                        Like (
                        {
                            data.reactions.filter(
                                reaction => reaction.type === 'like'
                            ).length
                        }
                        )
                    </Text>
                </View>
                <View className="w-2/6 items-center">
                    <Text
                        onPress={() => reactionHander('dislike')}
                        className="p-1">
                        Dislike (
                        {
                            data.reactions.filter(
                                reaction => reaction.type === 'dislike'
                            ).length
                        }
                        )
                    </Text>
                </View>
                <View className="w-2/6 items-center">
                    <Text
                        className="p-1"
                        onPress={() => setShowComment(pre => !pre)}>
                        Comment ({data.comments.length})
                    </Text>
                </View>
            </View>
            <PostComment postData={data} show={showComment} />
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({});
