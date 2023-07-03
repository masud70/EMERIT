import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Wraper from '../../components/utilities/Wraper';
import Card from '../../components/utilities/Card';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { useMutation } from '@apollo/client';
import { SEND_FEEDBACK } from '../../graphql/utility';
import { FUNCTIONS } from '../../helpers';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '../../components/utilities/Loading';
import YoutubePlayer from 'react-native-youtube-iframe';

const About = () => {
    const [feedback, setFeedback] = useState('');
    const auth = useSelector(st => st.auth);
    const [sendFeedback, { loading, error, data }] = useMutation(SEND_FEEDBACK);

    const handleSendFeedback = async () => {
        try {
            await sendFeedback({
                variables: {
                    body: feedback,
                    token: auth.token
                }
            });
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    useEffect(() => {
        if (data) {
            FUNCTIONS.showToast2(data.sendFeedback.status, data.sendFeedback.message);
        }
    }, [data]);

    return (
        <>
            <Wraper head={'About Us'} bottomPadding>
                <Card title="Send us feedback">
                    <TextInput
                        multiline
                        numberOfLines={7}
                        textAlignVertical="top"
                        className="border rounded mb-2 px-2 border-[#2B3467]"
                        placeholder="Write your message..."
                        onChangeText={setFeedback}
                    />
                    <Pressable className="w-full" onPress={handleSendFeedback}>
                        <Text className="text-center font-bold text-lg text-white bg-[#2B3467] p-2 rounded">
                            Send Now
                        </Text>
                    </Pressable>
                </Card>
                <View className="w-full bg-slate-100 rounded overflow-hidden">
                    <Text className="w-full text-center text-white font-bold text-2xl bg-slate-800">
                        View us on Google Maps
                    </Text>
                    <View className="boder border-2 border-t-0 border-green-400">
                        <MapView
                            className="min-h-[200px]"
                            minZoomLevel={10}
                            initialRegion={{
                                latitude: 22.47056,
                                longitude: 91.78528,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}
                        />
                    </View>
                </View>
                <Card title="Youtube Video Embedding">
                <YoutubePlayer play={false} height={300} videoId={'iee2TATGMyI'} />
                </Card>
            </Wraper>
            <Loading loading={loading} />
        </>
    );
};

export default About;
