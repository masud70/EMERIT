import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import { FUNCTIONS } from '../../helpers';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_USER_INFO_QUERY, GET_AVAILABILITY_QUERY } from '../../graphql/query';
import { RefreshControl } from 'react-native';
import Card from '../../components/utilities/Card';
import { BASE_URL } from '@env';
import UpdateDataCard from '../../components/profile/UpdateDataCard';
import Input from '../../components/utilities/Input';
import FlatButton from '../../components/utilities/FlatButton';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

const EditProfile = () => {
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState({});
    const [imagePicked, setImagePicked] = useState(null);
    const [usernameAvail, setUsernameAvail] = useState(0);
    const navigation = useNavigation();
    const auth = useSelector(st => st.auth);

    let timeOut;

    const { loading, data, refetch } = useQuery(GET_USER_INFO_QUERY, {
        variables: { token: auth.token }
    });
    const [getAvailability] = useLazyQuery(GET_AVAILABILITY_QUERY);

    const onImageSelect = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images]
            });
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

    const uploadPhoto = async () => {
        try {
            let imgData = null;
            if (image) imgData = await FUNCTIONS.uploadImage(imagePicked, auth.token);
            if (imgData) FUNCTIONS.showToast2(imgData.status, imgData.message);
            if (imgData?.status) refetch();
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    const checkUsername = async val => {
        clearTimeout(timeOut);
        setUserData({ ...userData, username: val });
        setUsernameAvail(2);

        if (val.length < 3) console.log('Invalid length.');
        else if (val === data.getUserInfo.username) setUsernameAvail(0);
        else {
            timeOut = setTimeout(async () => {
                try {
                    const result = await getAvailability({
                        variables: { id: 'username', value: val }
                    });
                    const { status } = result.data.getAvaialability;
                    setUsernameAvail(!status ? 1 : 2);
                } catch (error) {
                    setUsernameAvail(2);
                }
            }, 1500);
        }
    };

    useEffect(() => {
        setUserData(data.getUserInfo);
    }, [data]);

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
                    <View className="w-full items-center">
                        <ImageBackground
                            source={{ uri: image ? image : BASE_URL + data?.getUserInfo?.avatar }}
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
                        {image && (
                            <Pressable
                                onPress={uploadPhoto}
                                className="bg-[#2b346788] p-2 rounded mt-1">
                                <Text className="font-bold text-white">Update Photo</Text>
                            </Pressable>
                        )}
                    </View>
                </ImageBackground>
                <View className="w-full px-4 space-y-2 mt-2">
                    <Card title="Name">
                        <UpdateDataCard
                            placeholder="Name"
                            field="name"
                            refetch={refetch}
                            value={userData.name}
                            rightIcon={'md-checkmark-sharp'}
                            onChangeText={val => {
                                setUserData({ ...userData, name: val });
                            }}
                        />
                    </Card>
                    <Card title="Username">
                        <UpdateDataCard
                            placeholder="Username"
                            field="username"
                            refetch={refetch}
                            value={userData?.username}
                            rightIcon={usernameAvail === 2 ? 'close-sharp' : 'md-checkmark-sharp'}
                            onChangeText={checkUsername}
                            updateCheck={usernameAvail === 2}
                            checkMessage={'Username not available.'}
                        />
                    </Card>
                    <Card title="Email">
                        <UpdateDataCard
                            placeholder="Email"
                            field="email"
                            refetch={refetch}
                            value={userData?.email}
                            rightIcon={usernameAvail === 2 ? 'close-sharp' : 'md-checkmark-sharp'}
                            onChangeText={val => {
                                setUserData({ ...userData, email: val });
                            }}
                            editable={false}
                            updateCheck={true}
                            checkMessage={'Email cannot be updated.'}
                        />
                    </Card>
                    <Card title="Contact">
                        <UpdateDataCard
                            placeholder="Contact"
                            field="phone"
                            refetch={refetch}
                            value={userData?.phone}
                            rightIcon={
                                userData?.phone?.length !== 11
                                    ? 'close-sharp'
                                    : 'md-checkmark-sharp'
                            }
                            onChangeText={val => {
                                setUserData({ ...userData, phone: val });
                            }}
                            updateCheck={userData?.phone?.length !== 11}
                            checkMessage={'Invalid length.'}
                        />
                    </Card>
                    <Card title="Country">
                        <UpdateDataCard
                            placeholder="Country"
                            field="country"
                            refetch={refetch}
                            value={userData?.country}
                            rightIcon={
                                userData?.country?.length <= 2
                                    ? 'close-sharp'
                                    : 'md-checkmark-sharp'
                            }
                            onChangeText={val => {
                                setUserData({ ...userData, country: val });
                            }}
                            updateCheck={userData?.country?.length <= 2}
                            checkMessage={'Invalid length.'}
                        />
                    </Card>
                    <Card title="Password">
                        <Input
                            placeholder="Password"
                            value={userData.password}
                            onChangeText={val => setUserData({ ...userData, password: val })}
                        />
                    </Card>
                    <Card title="Confirm Password">
                        <UpdateDataCard
                            placeholder="Confirm Password"
                            field="password"
                            refetch={refetch}
                            value={userData?.confirmPassword}
                            rightIcon={
                                userData?.password !== userData?.confirmPassword
                                    ? 'close-sharp'
                                    : 'md-checkmark-sharp'
                            }
                            onChangeText={val => {
                                setUserData({ ...userData, confirmPassword: val });
                            }}
                            updateCheck={
                                userData?.password !== userData?.confirmPassword ||
                                userData?.password?.length <= 5
                            }
                            checkMessage={'Invalid password length.'}
                        />
                    </Card>
                    <FlatButton title="Finish" onPress={() => navigation.goBack()} />
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
