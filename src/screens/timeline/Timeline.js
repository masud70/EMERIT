import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import style from '../../../styles/style.scss';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import PostBox from './PostBox';
import { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST_MUTATION, GET_ALL_POST_QUERY } from '../../graphql/postQuery';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import { ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native';

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;
const Timeline = () => {
    const [createdBody, setCreatedBody] = useState('Write your post here...');
    const [showModal, setShowModal] = useState(false);
    const auth = useSelector(st => st.auth);
    const richText = useRef();

    const [createPost, { loading: createLoading, error: createError, data: createData }] =
        useMutation(CREATE_POST_MUTATION);

    const {
        loading: postLoading,
        error: postError,
        data: postData,
        refetch: postRefetch
    } = useQuery(GET_ALL_POST_QUERY);

    useEffect(() => {
        if (createData) {
            FUNCTIONS.showToast2(createData.createPost.status, createData.createPost.message);
            setShowModal(pre => !pre);
            setCreatedBody('');
            postRefetch();
        }
    }, [createData]);

    return (
        <SafeAreaView style={style.mainContainer}>
            <View className="h-full">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2 mb-1">
                    <Text className="font-bold text-2xl text-gray-600">Timeline</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={postLoading} onRefresh={postRefetch} />
                    }>
                    <View className="w-full">
                        <TouchableOpacity
                            className="w-full bg-green-500 p-2 rounded"
                            onPress={() => setShowModal(pre => !pre)}>
                            <Text className="w-full text-center font-bold text-lg text-white">
                                Create Post
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Modal
                            avoidKeyboard
                            isVisible={showModal}
                            onBackdropPress={() => setShowModal(pre => !pre)}
                            onBackButtonPress={() => setShowModal(pre => !pre)}>
                            <View className="w-full bg-white rounded overflow-hidden p-2 flex items-center">
                                <Text className="w-full text-gray-900 text-center font-bold text-lg bg-green-100 rounded-t py-1">
                                    Create A New Post
                                </Text>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <ScrollView
                                        className="w-full"
                                        showsVerticalScrollIndicator={false}>
                                        <RichEditor
                                            ref={richText}
                                            initialContentHTML={createdBody}
                                            initialHeight={300}
                                            onChange={html => setCreatedBody(html)}
                                        />
                                    </ScrollView>
                                    <RichToolbar
                                        editor={richText}
                                        actions={[
                                            actions.setBold,
                                            actions.setItalic,
                                            actions.setUnderline,
                                            actions.heading1,
                                            actions.insertImage,
                                            actions.insertBulletsList,
                                            actions.insertOrderedList,
                                            actions.insertLink,
                                            actions.keyboard,
                                            actions.setStrikethrough,
                                            actions.setUnderline,
                                            actions.removeFormat,
                                            actions.insertVideo,
                                            actions.undo,
                                            actions.redo
                                        ]}
                                        iconMap={{ [actions.heading1]: handleHead }}
                                    />
                                    <View className="w-full flex flex-row justify-between pt-2">
                                        <TouchableOpacity
                                            className="w-1/2 bg-slate-500 p-2 rounded-l"
                                            onPress={() => setShowModal(pre => !pre)}>
                                            <Text className="w-full text-center font-bold text-lg text-white">
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="w-1/2 bg-green-500 p-2 rounded-r"
                                            onPress={() => {
                                                const variables = {
                                                    token: auth.token,
                                                    body: createdBody
                                                };
                                                createPost({ variables: variables });
                                            }}>
                                            <Text className="w-full text-center font-bold text-lg text-white">
                                                Post
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </Modal>
                    </View>
                    <View className="w-full flex flex-col space-y-2 pt-2">
                        {postLoading || postError ? (
                            <ActivityIndicator size={40} />
                        ) : (
                            postData.getAllPost.map((item, idx) => (
                                <PostBox key={idx} refetch={postRefetch} data={item} />
                            ))
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Timeline;
