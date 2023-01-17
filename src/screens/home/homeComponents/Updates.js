import { StyleSheet, Text, View } from 'react-native';
import {
    actions,
    RichEditor,
    RichToolbar
} from 'react-native-pell-rich-editor';
import React, { useState } from 'react';
import Post from './Post';
import { IconButton } from 'react-native-paper';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader
} from '@react-native-material/core';
import { CONSTANT } from '../../../constants';
import { FUNCTIONS } from '../../../helpers';
import { useSelector } from 'react-redux';

const Updates = () => {
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState('');
    const auth = useSelector(state => state.auth);
    const post = useSelector(state => state.post.data);
    const richText = React.useRef();

    const handleCreate = () => {
        const url = CONSTANT.SERVER_URL + 'post/create';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            },
            body: JSON.stringify({ body: postData })
        })
            .then(r => r.json())
            .then(res => {
                if (res.status) {
                    setShowModal(false);
                    setPostData('');
                }
                FUNCTIONS.showToast2(res.status, res.message);
            })
            .catch(err => FUNCTIONS.showToast2(false, err.message));
    };

    return (
        <View className="space-y-1">
            <View className="w-full bg-green-100 rounded p-2 flex flex-row justify-between items-center">
                <Text className="font-bold text-gray-700">Latest Updates</Text>
                <IconButton
                    icon="plus"
                    className="h-full bg-green-200"
                    size={20}
                    onPress={() => setShowModal(true)}
                />
            </View>
            <View className="w-full space-y-1">
                {post.map((item, id) => {
                    return <Post data={item} key={id} />;
                })}
            </View>

            <Dialog visible={showModal} onDismiss={() => setShowModal(false)}>
                <DialogHeader title="Create a new post" />
                <DialogContent className="w-full p-0 m-0">
                    <RichEditor
                        initialHeight={100}
                        placeholder="Write your post here..."
                        ref={richText}
                        initialContentHTML={postData}
                        onChange={d => setPostData(d)}
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
                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => setShowModal(false)}
                    />
                    <Button
                        title="Post"
                        compact
                        variant="text"
                        onPress={handleCreate}
                    />
                </DialogActions>
            </Dialog>
        </View>
    );
};

export default Updates;

const styles = StyleSheet.create({});
