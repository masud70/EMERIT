import { Dimensions, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QuestionCard from '../../components/QuestionCard';

const QuestionBoxScreen = () => {
    const {width, height} = Dimensions.get('window');

    const questions = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
        {id: 5},
    ]

    const questionList = questions.map((item, idx)=>{
        return (
            <QuestionCard key={idx}/>
        )
    })

    return (
        <ImageBackground source={require('../../assets/bg/2.png')} width={width} height={height} resizeMode="cover" className='h-full'>
            <SafeAreaView className='px-2 pt-2 mb-10'>
                <View className='h-10 flex items-center justify-center rounded  border-b-2 border-b-slate-600'>
                    <Text className='font-bold text-2xl text-white'>Mathematics</Text>
                </View>
                <ScrollView className='w-full'>
                    <View className='items-center justify-center w-full px-2'>
                        {questionList}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default QuestionBoxScreen

const styles = StyleSheet.create({})