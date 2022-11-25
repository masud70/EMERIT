import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import React, { useState } from 'react';
import { Button, IconButton, MD3Colors, TextInput } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { CONSTANT } from '../../constants';

const EditProfile = () => {
    const user = useSelector(st => st.login.userData);
    const [image, setImage] = useState(null);

    const onDocumentPress = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images]
            });
            if (res.size < 2000000) {
                let data = new FormData();
                data.append('avatar', res);
                setImage(res.uri);
                try {
                    const responseOfFileUpload = await fetch(
                        'http://192.168.0.107:5000/uploadAvatar',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            body: data
                        }
                    );
                    if (responseOfFileUpload.status == 200) {
                        let responseInJs = await responseOfFileUpload.json();
                        console.log('Upload Successful!');
                        setImage(null);
                    } else {
                        console.log('Upload Failed');
                    }
                } catch (err) {
                    console.log('Upload Failed');
                    console.log(err, 'error in upload');
                }
            } else {
                console.log('File size should not exceed 2MB');
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled');
            } else {
                console.log(err);
            }
        }
    };

    const showToast = (type, t1, t2) => {
        Toast.show({
            type: type,
            text1: t1,
            text2: t2
        });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground
                    source={require('../../assets/bg/2.png')}
                    className="w-full flex-1 min-h-[220px] justify-around flex items-center rounded-b-3xl overflow-hidden">
                    <View className="w-full items-center">
                        <Text className="flex justify-center items-center font-bold text-2xl text-white">
                            Edit Profile
                        </Text>
                    </View>
                    <View>
                        <ImageBackground
                            source={{
                                uri: user
                                    ? CONSTANT.IMG_BASE_URL + user.avatar
                                    : image
                                    ? image
                                    : CONSTANT.IMG_BASE_URL + 'user.jpg'
                            }}
                            className="w-32 h-32 rounded-full overflow-hidden items-center justify-center bg-slate-300"
                            style={styles.border}>
                            <IconButton
                                icon={'camera'}
                                size={30}
                                animated
                                iconColor={MD3Colors.error20}
                                containerColor="rgba(149, 165, 166, 0.5)"
                                onPress={() => {
                                    onDocumentPress();
                                }}
                            />
                        </ImageBackground>
                    </View>
                </ImageBackground>
                <View className="w-full px-4 space-y-2 mt-2">
                    <View>
                        <Text className="font-bold">Name</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={user ? user.name : ''}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Username</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={user ? user.username : ''}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Email</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={user ? user.email : ''}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Contact</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={user ? user.mobile : ''}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Password</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={''}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Confirm Password</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={''}
                        />
                    </View>
                </View>
                <View className="w-full px-4 mt-10 mb-6">
                    <Button
                        onPress={() =>
                            showToast('success', 'Head', 'Body here!!!')
                        }
                        uppercase
                        mode="contained">
                        SAVE
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    border: {
        borderWidth: 3,
        borderColor: 'white'
    }
});
