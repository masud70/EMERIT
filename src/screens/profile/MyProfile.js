import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import TextCard from '../../components/profile/TextCard';
import { CONSTANT, ROUTES } from '../../constants';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, ImageBackground } from 'react-native';
import { BASE_URL } from '@env';

const MyProfile = () => {
    const navigation = useNavigation();
    const user = useSelector(st => st.auth.userData);

    const data = [
        {
            field: 'Email',
            value: user ? user.email : '',
            icon: 'mail'
        },
        {
            field: 'Contact',
            value: user ? user.phone : 'No Phone Number Set',
            icon: 'call'
        },
        {
            field: 'Country',
            value: 'Bangladesh',
            icon: 'home'
        }
    ];

    return (
        <SafeAreaView className="items-center justify-center h-screen">
            <ScrollView>
                <ImageBackground
                    source={require('../../assets/bg/2.png')}
                    className="w-full flex-1 bg-slate-400 justify-center flex items-center rounded-b-3xl overflow-hidden">
                    <View className="w-full h-12 flex flex-row pt-2">
                        <View className="w-full items-center">
                            <Text className="flex justify-center items-center font-bold text-2xl text-white">
                                My Profile
                            </Text>
                        </View>
                        <View className="justify-center absolute right-6 top-4">
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
                                <Icon name="ellipsis-horizontal-outline" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Avatar.Image
                            className="overflow-hidden p-0 m-0 items-center justify-center"
                            source={{
                                uri: user
                                    ? BASE_URL + user.avatar
                                    : CONSTANT.IMG_BASE_URL + 'user.jpg'
                            }}
                            size={130}
                            style={styles.border}
                        />
                    </View>
                    <View className="w-full justify-center items-center min-h-[70px]">
                        <Text className="font-bold text-white text-xl">
                            {user ? user.name : ''}
                        </Text>
                        <Text className="font-bold text-base text-slate-700">
                            {user ? user.username : ''}
                        </Text>
                    </View>
                    <View className="px-4">
                        <View className="w-full flex flex-row justify-between bg-slate-100 rounded py-3 mb-2 divide-x-2 divide-slate-300">
                            <View className="w-1/2 flex flex-row items-center space-x-2 justify-center">
                                <View>
                                    <Icon name="trophy-sharp" size={35} color={'#F49D1A'} />
                                </View>
                                <View>
                                    <Text className="font-bold text-md">Ranking</Text>
                                    <Text className="font-bold text-lg text-amber-500">123</Text>
                                </View>
                            </View>
                            <View className="w-1/2 flex flex-row items-center justify-center space-x-2 px-3">
                                <View>
                                    <Icon name="server-sharp" size={35} color={'#F49D1A'} />
                                </View>
                                <View>
                                    <Text className="font-bold text-md">Points</Text>
                                    <Text className="font-bold text-lg text-amber-500">1256</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View className="w-full justify-center items-center px-2 mt-2">
                    {data.map((item, key) => {
                        return <TextCard data={item} key={key} />;
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    border: {
        borderWidth: 3,
        borderColor: 'white'
    }
});
