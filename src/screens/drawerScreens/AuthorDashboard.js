import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import Section from '../../components/Author/Section';
import { ROUTES } from '../../constants';

const AuthorDashboard = () => {
    return (
        <SafeAreaView>
            <View className="h-screen px-2 py-1 w-screen bg-white">
                <View className="w-full items-center justify-center border-b-4 border-green-500 bg-green-100 rounded p-2">
                    <Text className="font-bold text-xl ">Admin Dashboard</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="mt-1 pb-4">
                        <Section
                            data={{ sectionName: 'Contest Section', icon: 'trophy' }}
                            route={ROUTES.AUTHOR_CONTEST}
                        />
                        <Section
                            data={{ sectionName: 'Question Section', icon: 'help-circle' }}
                            route={ROUTES.AUTHOR_QUESTION}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AuthorDashboard;
