import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants';
import ContestItem from '../../../components/Author/ContestItem';
import { useEffect } from 'react';
import { FUNCTIONS } from '../../../helpers';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ContestSectionHome = () => {
    const [contestData, setContestData] = useState([]);
    const navigation = useNavigation();
    const user = useSelector(st => st.auth);

    useEffect(() => {
        FUNCTIONS.findContest({ createdBy: 5 }, user.token)
            .then(res => {
                if (res.status) {
                    setContestData(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl ">
                        Contest Dashboard
                    </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <TouchableOpacity
                            className="w-full bg-gray-200 justify-center items-center rounded p-1 mt-1"
                            onPress={() =>
                                navigation.navigate(
                                    ROUTES.AUTHOR_CONTEST_CREATE
                                )
                            }>
                            <Text className="font-bold text-lg text-green-500">
                                Create A New Contest
                            </Text>
                        </TouchableOpacity>
                        <View className="">
                            {contestData.map((item, idx) => (
                                <ContestItem data={item} key={idx} mode='admin'/>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ContestSectionHome;

const styles = StyleSheet.create({});
