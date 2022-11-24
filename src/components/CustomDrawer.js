import React from 'react';
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
import { COLORS, IMGS } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/state/auth/loginSlice';

const { width } = Dimensions.get('screen');

const CustomDrawer = props => {
    const dispatch = useDispatch();

    return (
        <DrawerContentScrollView {...props}>
            <ImageBackground source={IMGS.bgPattern} style={{ height: 140 }}>
                <Image source={IMGS.user} style={styles.userImg} />
            </ImageBackground>
            <View className="pt-14">
                <View className="items-center">
                    <Text className="font-bold text-xl text-black">
                        Md. Masud Mazumder
                    </Text>
                    <Text className="font-bold">@nishat</Text>
                </View>
            </View>
            <View style={styles.drawerListWrapper}>
                <DrawerItemList {...props} />
            </View>
            <View className="w-full items-center mt-44 mb-3">
                <TouchableOpacity onPress={()=>dispatch(logout())} className="p-2 bg-orange-700 w-40 rounded-3xl items-center">
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
        width: 110,
        height: 110,
        borderRadius: 110 / 2,
        position: 'absolute',
        left: width / 2 - 110,
        bottom: -110 / 2,
        borderWidth: 4,
        borderColor: COLORS.white
    },
    drawerListWrapper: {
        marginTop: 25
    }
});
