import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Upcoming from '../../components/contest/Upcoming';
import Live from '../../components/contest/Live';
import Ended from '../../components/contest/Ended';
import { COLORS } from '../../constants';
const {width, height} = Dimensions.get('window');

const Contest = () => {
    const [type, setType] = useState(1);
    return (
        <ImageBackground source={require('../../assets/bg/4.png')} width={width} height={height} resizeMode="cover" className='h-full'>
            <SafeAreaView className='px-2 pt-2'>
                <View className='h-10 flex items-center justify-center rounded'>
                    <Text className='font-bold text-2xl text-white'>Contest</Text>
                </View>
                <View className='bg-white flex flex-row justify-between h-10 items-center rounded-3xl'>
                    <TouchableOpacity onPress={()=>setType(1)} className={`w-1/3 ${type===1?'bg-slate-500':''} h-full items-center justify-center rounded-full`}>
                        <Text className={`font-bold text-lg ${type===1?'text-slate-100':'text-slate-800'}`}>Upcoming</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setType(2)} className={`w-1/3 ${type===2?'bg-slate-500':''} h-full items-center justify-center rounded-full`}>
                        <Text className={`font-bold text-lg ${type===2?'text-slate-100':'text-slate-800'}`}>Live</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setType(3)} className={`w-1/3 ${type===3?'bg-slate-500':''} h-full items-center justify-center rounded-full`}>
                        <Text className={`font-bold text-lg ${type===3 ? 'text-slate-100' : 'text-slate-800'}`}>Ended</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className='mt-2 rounded-xl mb-20'>
                    <View className='rounded h-full mx-1'>
                        {
                            type === 1 ? <Upcoming/> : type === 2 ? <Live/> : <Ended/>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Contest

const styles = StyleSheet.create({
    bb: {
        backgroundColor: COLORS.primary,
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})