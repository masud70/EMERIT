import {
    ImageBackground,
    StyleSheet,
    Image,
    View,
    Dimensions,
    Text
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import React from 'react';
import { COLORS, CONSTANT, IMGS } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/state/auth/authSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const CustomDrawer = props => {
    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();
    const user = useSelector(st => st.auth);

    useEffect(() => {
        setUserData(user.userData);
    }, []);

    return (
        <DrawerContentScrollView {...props}>
            <ImageBackground
                source={IMGS.bgPattern}
                style={{ height: 140 }}
                className="w-full">
                <Avatar.Image
                    className="border-4 items-center justify-center border-white overflow-hidden"
                    source={{ uri: CONSTANT.SERVER_URL + userData.avatar }}
                    size={110}
                    style={styles.userImg}
                />
            </ImageBackground>
            <View className="pt-14">
                <View className="items-center">
                    <Text className="font-bold text-xl text-gray-600">
                        {userData.name}
                    </Text>
                    <Text className="font-bold">@{userData.username}</Text>
                </View>
            </View>
            <View style={styles.drawerListWrapper}>
                <DrawerItemList {...props} />
            </View>
            <View className="w-full items-center mt-44 mb-3">
                <TouchableOpacity
                    onPress={() => dispatch(logout())}
                    className="p-2 bg-orange-700 w-40 rounded-3xl items-center">
                    <Text className="w-1/2 font-bold text-base text-white">
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    userImg: {
        position: 'absolute',
        left: width / 2 - 110,
        bottom: -110 / 2
    },
    drawerListWrapper: {
        marginTop: 25
    }
});
