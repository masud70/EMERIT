import { View, Text, Pressable } from 'react-native';
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
import { CREATE_POST_MUTATION, GET_POST_BY_PAGE_QUERY } from '../../graphql/postQuery';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import Wraper from '../../components/utilities/Wraper';
import { FAB } from 'react-native-paper';
import Loading from '../../components/utilities/Loading';
import ImageCropPicker from 'react-native-image-crop-picker';

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;
const Timeline = () => {
    const [createdBody, setCreatedBody] = useState('Write your post here...');
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const auth = useSelector(st => st.auth);
    const richText = useRef();

    const [createPost, { loading: createLoading, data: createData }] =
        useMutation(CREATE_POST_MUTATION);

    const {
        loading: postLoading,
        data: postData,
        refetch: postRefetch
    } = useQuery(GET_POST_BY_PAGE_QUERY, { variables: { page: page } });

    const onPressAddImage = () => {
        ImageCropPicker.openPicker({
            cropping: true,
            freeStyleCropEnabled: true,
            mediaType: 'photo',
            includeBase64: true
        })
            .then(image => {
                const fileSizeInMB = image.size / (1024 * 1024);
                if (fileSizeInMB >= 1)
                    FUNCTIONS.showToast2(false, 'Image size should be less than 1MB.');
                else richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
            })
            .catch(error => console.log(error.message));
    };

    useEffect(() => {
        if (createData) {
            FUNCTIONS.showToast2(createData.createPost.status, createData.createPost.message);
            setShowModal(pre => !pre);
            setCreatedBody('');
            postRefetch();
        }
    }, [createData]);

    return (
        <>
            <Wraper
                head="Timeline"
                bottomPadding
                refresh={{ loading: postLoading, refetch: postRefetch }}>
                {!postData?.getPostByPage.length ? (
                    <Text className="w-full text-center font-bold text-xl py-2 mb-1">
                        No more posts
                    </Text>
                ) : (
                    postData?.getPostByPage.map((item, idx) => (
                        <PostBox key={idx} refetch={postRefetch} data={item} />
                    ))
                )}

                {/* Pagination */}
                <View className="mb-2 py-2 w-full bg-white rounded overflow-hidden flex flex-row justify-around">
                    <Pressable onPress={() => setPage(1)}>
                        <Text
                            style={style.paginationBtn}
                            className={`${page === 1 ? 'bg-slate-800' : 'bg-green-600'}`}>
                            Start
                        </Text>
                    </Pressable>
                    <Pressable disabled={page === 1} onPress={() => setPage(pre => pre - 1)}>
                        <Text
                            style={style.paginationBtn}
                            className={`${page === 1 ? 'bg-slate-500' : 'bg-green-600'}`}>
                            Pre
                        </Text>
                    </Pressable>
                    {page > 3 && <Text className="font-bold text-xl text-center">...</Text>}
                    <Text className="font-bold text-xl text-center">...</Text>
                    <Pressable
                        disabled={postData?.getPostByPage.length === 0}
                        onPress={() => setPage(pre => pre + 1)}>
                        <Text
                            style={style.paginationBtn}
                            className={`${
                                postData?.getPostByPage.length === 0
                                    ? 'bg-slate-500'
                                    : 'bg-green-600'
                            }`}>
                            Next
                        </Text>
                    </Pressable>
                </View>
            </Wraper>
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
                        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
                            <RichEditor
                                ref={richText}
                                initialContentHTML={createdBody}
                                initialHeight={300}
                                onChange={html => setCreatedBody(html)}
                            />
                        </ScrollView>
                        <RichToolbar
                            editor={richText}
                            onPressAddImage={onPressAddImage}
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
            <FAB
                variant="surface"
                icon="plus"
                className="m-5 absolute right-0 bottom-0"
                onPress={() => setShowModal(pre => !pre)}
            />
            <Loading loading={createLoading} />
        </>
    );
};

export default Timeline;
