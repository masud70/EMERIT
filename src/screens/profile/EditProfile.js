import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconButton, MD3Colors, TextInput } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANT } from '../../constants';
import { FUNCTIONS } from '../../helpers';
import { setAuthUserData } from '../../redux/state/auth/authSlice';

const EditProfile = () => {
    const user = useSelector(st => st.auth);
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState({});
    const [imagePicked, setImagePicked] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(user.userData);
    }, []);

    const onImageSelect = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images]
            });
            if (res.size < 2000000) {
                setImage(res.uri);
                setImagePicked(res);
            } else {
                FUNCTIONS.showToast(
                    'error',
                    'Error',
                    'Image size should be less than 2MB'
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleUpdate = async () => {
        if (userData.password) {
            try {
                if (image) {
                    const imgData = await FUNCTIONS.uploadImage(imagePicked);
                    userData.avatar = imgData.path;
                    setImage(null);
                }
                const response = await FUNCTIONS.updateUser(
                    userData,
                    user.token
                );
                if (response.status === true) {
                    FUNCTIONS.showToast('success', 'Success', response.message);
                    userData.password = '';
                    userData.confirmPassword = '';
                    dispatch(setAuthUserData({ userData: userData }));
                } else {
                    FUNCTIONS.showToast('error', 'Error', response.message);
                }
            } catch (error) {
                FUNCTIONS.showToast('error', 'Error', error.message);
            }
        } else {
            FUNCTIONS.showToast('info', 'Warning', 'Password cannot be empty.');
        }
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
                                uri: image
                                    ? image
                                    : user
                                    ? CONSTANT.SERVER_URL + userData.avatar
                                    : CONSTANT.SERVER_URL + 'images/user.jpg'
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
                                    onImageSelect();
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
                            value={userData.name}
                            onChangeText={val => {
                                setUserData({ ...userData, name: val });
                            }}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Username</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={userData.username}
                            onChangeText={val => {
                                setUserData({ ...userData, username: val });
                            }}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Email</Text>
                        <TextInput
                            mode="outlined"
                            disabled
                            right={<TextInput.Icon icon="pencil" />}
                            value={userData.email}
                            onChangeText={val => {
                                setUserData({ ...userData, email: val });
                            }}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Contact</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={userData.phone}
                            onChangeText={val => {
                                setUserData({ ...userData, phone: val });
                            }}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Password</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={userData.password}
                            onChangeText={val => {
                                setUserData({ ...userData, password: val });
                            }}
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Confirm Password</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value={userData.confirmPassword}
                            onChangeText={val => {
                                setUserData({
                                    ...userData,
                                    confirmPassword: val
                                });
                            }}
                        />
                    </View>
                </View>
                <View className="w-full px-4 mt-10 mb-6">
                    <TouchableOpacity
                        className="w-full bg-green-500 p-2 items-center rounded"
                        onPress={handleUpdate}>
                        <Text className="text-lg font-bold text-white">
                            Update
                        </Text>
                    </TouchableOpacity>
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
