import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CONSTANT } from '../../constants';
import { useSelector } from 'react-redux';

const ContestScreen = ({ route }) => {
    const { width, height } = Dimensions.get('window');
    const [contestData, setContestData] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const auth = useSelector(state => state.auth);

    const loadData = () => {
        setLoading(true);
        const url = CONSTANT.BASE_URL + '/contest/getOneById/' + route.params.data.id;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            }
        })
            .then(r => r.json())
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                setData(res.data);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
        setContestData(route.params.data);
    }, []);

    return (
        <ImageBackground
            source={require('../../assets/bg/2.png')}
            width={width}
            height={height}
            resizeMode="cover"
            className="h-full">
            <SafeAreaView className="px-2 pt-2 flex justify-between h-full">
                <View className="w-full h- flex items-center border-b-2 border-b-slate-600 pb-2">
                    <Text className="font-bold text-2xl text-white w-full text-center">
                        EMERIT Testing Contest 01 Lorem ipsum dolor sit amet.
                    </Text>
                </View>
                {/* Question */}
                <View className="w-full bg-slate-100 rounded  min-h-[50%] max-h-[70%] p-2">
                    <ScrollView className="max-h-[70%] overflow-auto">
                        <Text className="font-medium text-base select-none">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto quo
                            atque ad voluptas facilis, doloribus quibusdam iste numquam in
                            reiciendis illo facere maxime non odit deserunt? Eos odit dicta
                            suscipit. ipsum dolor, আমার sit amet consectetur adipisicing elit. Animi
                            corrupti laudantium exercitationem eveniet in! Laborum expedita
                            praesentium voluptates minus necessitatibus, accusamus incidunt ut
                            distinctio nemo sed fugit asperiores, porro eius sunt. Doloribus
                            temporibus dicta labore ad at, quam repudiandae beatae, distinctio sint
                            quod quasi sunt porro eligendi eaque reiciendis ipsa. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Corporis architecto nostrum et
                            eos quis dolor dicta modi expedita quod laudantium placeat doloremque
                            sit esse est, dolores facere in temporibus atque! Lorem ipsum dolor sit
                            amet, consectetur adipisicing elit. Quidem consectetur aspernatur
                            excepturi iure? Quibusdam dolores laudantium dolorum beatae, voluptatum
                            eveniet earum, rerum placeat natus consectetur ducimus temporibus est?
                            Ut accusantium beatae nisi obcaecati, cum veritatis architecto dolor,
                            nam, possimus libero commodi. Eum, eaque iste! Dolores id dolore ipsa
                            omnis fugiat!
                        </Text>
                    </ScrollView>
                    <View className="flex justify-between space-y-1 mt-3">
                        <View className="w-full bg-slate-300 p-1 flex flex-row space-x-2 items-center rounded">
                            <Text className="font-bold">A.</Text>
                            <Text className="text-base w-11/12">Lorem ipsum dolor sit amet.</Text>
                        </View>
                        <View className="w-full bg-slate-300 p-1 flex flex-row space-x-2 items-center rounded">
                            <Text className="font-bold">B.</Text>
                            <Text className="text-base w-11/12">
                                Lorem ipsum dolor sit amet. consectetur adipisicing elit. Officia,
                                voluptatem?
                            </Text>
                        </View>
                        <View className="w-full bg-slate-300 p-1 flex flex-row space-x-2 items-center rounded">
                            <Text className="font-bold">C.</Text>
                            <Text className="text-base w-11/12">Lorem ipsum dolor sit amet.</Text>
                        </View>
                        <View className="w-full bg-slate-300 p-1 flex flex-row space-x-2 items-center rounded">
                            <Text className="font-bold">D.</Text>
                            <Text className="text-base w-11/12">Lorem ipsum dolor sit amet.</Text>
                        </View>
                    </View>
                </View>
                <View className="w-full rounded mb-2 space-y-3">
                    <View className="w-full">
                        <TouchableOpacity className="w-full items-center p-2 bg-green-700 rounded-2xl">
                            <Text className="text-white font-bold text-lg">Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="w-full flex flex-row justify-between">
                        <TouchableOpacity className="bg-slate-300 p-2 rounded-xl w-24 items-center">
                            <Text className="font-bold text-base">Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-slate-300 p-2 rounded-xl w-24 items-center">
                            <Text className="font-bold text-base">Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default ContestScreen;

const styles = StyleSheet.create({});
