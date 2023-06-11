import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconButton, MD3Colors, TextInput } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import { setAuthUserData } from '../../redux/state/auth/authSlice';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO_QUERY } from '../../graphql/query';
import { RefreshControl } from 'react-native';
import { BASE_URL } from '@env';

const EditProfile = () => {
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState({});
    const [imagePicked, setImagePicked] = useState(null);
    const dispatch = useDispatch();
    const auth = useSelector(st => st.auth);

    const { loading, error, data, refetch } = useQuery(GET_USER_INFO_QUERY, {
        variables: { token: auth.token }
    });

    const onImageSelect = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images]
            });
            console.log('Image', res);
            if (res.size < 2000000) {
                setImage(res.uri);
                setImagePicked(res);
            } else {
                FUNCTIONS.showToast2(false, 'Image size should be less than 2MB');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            if (image) {
                const imgData = await FUNCTIONS.uploadImage(imagePicked, auth.token);
                userData.avatar = imgData.path;
            }
            const response = await FUNCTIONS.updateUser(userData, auth.token);
            if (response.status) dispatch(setAuthUserData({ userData: userData }));
            FUNCTIONS.showToast2(response.status, response.message);
            
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    useEffect(() => {
        setUserData(data.getUserInfo);
    }, [data]);

    if (loading || error) {
        return (
            <SafeAreaView className="w-full h-screen">
                <ScrollView
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
                    <View className="w-full h-full flex justify-center items-center">
                        <ActivityIndicator size={40} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
    console.log(data);

    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
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
                            source={{ uri: image ? image : BASE_URL + data.getUserInfo.avatar }}
                            className="w-32 h-32 rounded-full overflow-hidden items-center justify-end bg-slate-300"
                            style={styles.border}>
                            <IconButton
                                className="w-full rounded-none mb-0"
                                icon={'camera'}
                                size={25}
                                animated
                                iconColor={MD3Colors.error10}
                                containerColor="rgba(149, 165, 166, 0.5)"
                                onPress={onImageSelect}
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
                        <Text className="text-lg font-bold text-white">Update</Text>
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
