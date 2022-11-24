import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import TextCard from '../../components/profile/TextCard';
import { ROUTES } from '../../constants';

const MyProfile = () => {
    const navigation = useNavigation();

    const data = [
        {
            field: 'Email',
            value: 'mdmasud.csecu@gmail.com',
            icon: 'home'
        },
        {
            field: 'Contact',
            value: '01710089091',
            icon: 'home'
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
                                onPress={() =>
                                    navigation.navigate(ROUTES.EDIT_PROFILE)
                                }>
                                <Icon
                                    name="ellipsis-horizontal-outline"
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Image
                            source={require('../../assets/user.jpg')}
                            className="w-32 h-32 rounded-full"
                            style={styles.border}
                        />
                    </View>
                    <View className="w-full justify-center items-center min-h-[70px]">
                        <Text className="font-bold text-white text-xl">
                            Md. Masud Mazumder
                        </Text>
                        <Text className="font-bold text-base text-slate-700">
                            @nishat
                        </Text>
                    </View>
                    <View className="px-4">
                        <View className="w-full flex flex-row justify-between bg-slate-100 rounded py-3 mb-2 divide-x-2 divide-slate-300">
                            <View className="w-1/2 flex flex-row items-center space-x-2 justify-center">
                                <View>
                                    <Icon
                                        name="trophy-sharp"
                                        size={35}
                                        color={'#F49D1A'}
                                    />
                                </View>
                                <View>
                                    <Text className="font-bold text-md">
                                        Ranking
                                    </Text>
                                    <Text className="font-bold text-lg text-amber-500">
                                        123
                                    </Text>
                                </View>
                            </View>
                            <View className="w-1/2 flex flex-row items-center justify-center space-x-2 px-3">
                                <View>
                                    <Icon
                                        name="server-sharp"
                                        size={35}
                                        color={'#F49D1A'}
                                    />
                                </View>
                                <View>
                                    <Text className="font-bold text-md">
                                        Points
                                    </Text>
                                    <Text className="font-bold text-lg text-amber-500">
                                        1256
                                    </Text>
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
