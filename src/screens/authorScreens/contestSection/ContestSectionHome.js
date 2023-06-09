import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CONTEST_BY_USER_ID_QUERY } from '../../../graphql/query';
import Item from '../../../components/contest/Item';

const ContestSectionHome = () => {
    const navigation = useNavigation();
    let auth = useSelector(st => st.auth);

    const { loading, error, data, refetch } = useQuery(GET_CONTEST_BY_USER_ID_QUERY, {
        variables: { token: auth.token }
    });

    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl ">Contest Dashboard</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
                    {loading || error ? (
                        <ActivityIndicator className="mt-10" size={40} color="gray" />
                    ) : (
                        <View>
                            <TouchableOpacity
                                className="w-full bg-gray-200 justify-center items-center rounded p-1 mt-1"
                                onPress={() => navigation.navigate(ROUTES.AUTHOR_CONTEST_CREATE)}>
                                <Text className="font-bold text-lg text-green-500">
                                    Create A New Contest
                                </Text>
                            </TouchableOpacity>
                            <View className="">
                                {data.getContestByUserId.map((item, idx) => (
                                    <Item
                                        data={item}
                                        key={idx}
                                        route={ROUTES.AUTHOR_CONTEST_EDIT}
                                    />
                                ))}
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ContestSectionHome;

const styles = StyleSheet.create({});
