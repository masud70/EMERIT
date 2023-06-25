import React, { useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';

const ComponentToImage = () => {
    const viewRef = useRef();

    const shareImage = async () => {
        try {
            const uri = await captureRef(viewRef, {
                format: 'jpg',
                quality: 1,
                fileName: 'emerit-' + new Date().getTime()
            });
            console.log('uri', uri);
            const shareResponse = await Share.open({ url: uri });
            console.log('shareResponse', shareResponse);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <>
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View className="w-full h-screen flex items-center justify-center p-2">
                        <ImageBackground
                            ref={viewRef}
                            source={require('../../assets/bg/poster_bg.png')}
                            className="w-full h-[650px] rounded-[5px] overflow-hidden mb-2 items-center flex">
                            <View className="w-full items-center top-[121px] right-[2px]">
                                <Image
                                    source={require('../../assets/user.jpg')}
                                    className="w-[140px] h-[140px] rounded-full items-center"
                                    style={{ borderWidth: 5, borderColor: '#F97F51' }}
                                />
                            </View>
                            <View className="w-full top-[27%] items-center">
                                <Text className="w-[85%] font-bold text-2xl text-center text-white">
                                    Md. Masud Mazumder
                                </Text>
                            </View>
                            <View className="w-full top-[35%] items-center">
                                <Text className="w-[85%] font-[tahoma] text-4xl font-extrabold text-center text-white">
                                    EMeriT Regular Contest - 01
                                </Text>
                            </View>
                            <View className="w-[75%] top-[70%] items-center justify-between flex flex-row bg-[#2B3467] rounded-xl p-2">
                                <Text className=" font-[tahoma] text-xl font-extrabold text-center text-white">
                                    Solved - 28/30
                                </Text>
                                <Text className=" font-[tahoma] text-xl font-extrabold text-center text-white">
                                    Rank - 1st
                                </Text>
                            </View>
                        </ImageBackground>

                        <TouchableOpacity className="w-full" onPress={shareImage}>
                            <Text className="text-center p-2 font-bold text-xl text-white bg-[#2B3467] rounded">
                                Share Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default ComponentToImage;