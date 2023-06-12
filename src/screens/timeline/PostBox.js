import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import moment from 'moment';

const PostBox = ({ data }) => {
    const { width } = useWindowDimensions();

    return (
        <View className="w-full bg-slate-200 mb-2 rounded overflow-hidden">
            <View className="w-full flex flex-row items-center bg-slate-300 p-2">
                <View className="w-1/6 border-r border-slate-400">
                    <Avatar.Image
                        className="overflow-hidden p-0 m-0 items-center justify-center border-green-400 border-2"
                        source={{ uri: 'https://picsum.photos/200' }}
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
                <Pressable className="w-2/6 flex flex-row justify-center items-center space-x-1">
                    <Icon name="thumbs-o-up" size={20} />
                    <Text className="font-bold">10</Text>
                </Pressable>
                <Pressable className="w-2/6 flex flex-row justify-center items-center space-x-1">
                    <Icon name="thumbs-o-down" size={20} />
                    <Text className="font-bold">10</Text>
                </Pressable>
                <Pressable className="w-2/6 flex flex-row justify-center items-center space-x-1">
                    <Icon name="comment-o" size={20} />
                    <Text className="font-bold">10</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PostBox;
