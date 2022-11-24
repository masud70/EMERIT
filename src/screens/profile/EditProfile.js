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
import * as ImagePicker from 'react-native-image-picker';

const EditProfile = () => {
    const [image, setImage] = useState(null);

    const imageOptions = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 400,
        maxWidth: 400
    };
    let uri = '../../assets/user.jpg';

    const imageUploader = () => {
        try {
            ImagePicker.launchImageLibrary(imageOptions, response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log(
                        'User tapped custom button: ',
                        response.customButton
                    );
                } else {
                    setImage(response);
                }
            });
        } catch (error) {
            console.log(error);
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
                            source={{ uri: image ? image.assets[0].uri : ' ' }}
                            className="w-32 h-32 rounded-full overflow-hidden items-center justify-center bg-slate-300"
                            style={styles.border}>
                            <IconButton
                                icon={'camera'}
                                size={30}
                                animated
                                iconColor={MD3Colors.error20}
                                containerColor="rgba(149, 165, 166, 0.5)"
                                onPress={() => {
                                    imageUploader();
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
                            value="Md. Masud Mazumder"
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Email</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value="mdmasud.csecu@gmail.com"
                        />
                    </View>
                    <View>
                        <Text className="font-bold">Contact</Text>
                        <TextInput
                            mode="outlined"
                            right={<TextInput.Icon icon="pencil" />}
                            value="01710089091"
                        />
                    </View>
                </View>
                <View className="w-full px-4 mt-10">
                    <Button loading uppercase mode="contained">
                        Save
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
