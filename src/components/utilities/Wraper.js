import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import { Dimensions } from 'react-native';

const Wraper = ({ head, children, refresh, bottomPadding }) => {
    const [firstViewHeight, setFirstViewHeight] = useState(0);
    const screenHeight = Dimensions.get('window').height;
    const secondViewHeight = screenHeight - firstViewHeight;

    const handleFirstViewLayout = event => {
        const { height } = event.nativeEvent.layout;
        setFirstViewHeight(height);
    };

    return (
        <SafeAreaView>
            <View className="min-h-[85%] px-2 py-1 w-screen bg-white">
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh ? refresh.loading : false}
                            onRefresh={refresh?.refetch}
                        />
                    }>
                    <View
                        onLayout={handleFirstViewLayout}
                        className="w-full items-center justify-center border-b-4 border-[#2B3467] bg-[#2b3467ea] rounded p-2 mb-1">
                        <Text className="font-bold text-xl text-white">{head}</Text>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        className="w-full"
                        style={{
                            minHeight: bottomPadding ? secondViewHeight - 55 : secondViewHeight - 10
                        }}>
                        {children}
                    </ScrollView>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Wraper;
