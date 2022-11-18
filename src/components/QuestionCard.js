import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const QuestionCard = () => {
    return (
        <View className='w-full bg-slate-200 rounded overflow-hidden my-1 py-1 flex flex-row divide-x-2 divide-slate-300'>
            <View className=' items-center justify-center' style={styles.left}>
                <Text className='font-bold text-2xl'>#25</Text>
            </View>
            <View className='flex flex-col px-2 pr-10'>
                <View>
                    <Text>Lorem ipsum dolor sit. Esse voluptatibus and band kdfjkds kjfgek voluptas cupiditate iste optio?</Text>
                </View>
                <View className='flex flex-row justify-between'>
                    <View>
                        <Text>Tried: 125</Text>
                    </View>
                    <View>
                        <Text>Solved: 101</Text>
                    </View>
                    <View>
                        <Text>Author: Nishat</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default QuestionCard

const styles = StyleSheet.create({
    left: {
        width: 50,
    }
})