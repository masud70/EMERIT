import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
const width = Dimensions.get('window').width;
const columns = Math.ceil(width/230);

const CategoryCard = () => {
    

    return (
        <TouchableOpacity style={styles.mainContainer} className='bg-slate-300 m-1 rounded p-2 flex justify-between'>
            <View className='w-full items-center justify-center'>
                <Icon name='planet-sharp' size={100} color={COLORS.primary}/>
            </View>
            <View className='w-full rounded px-2'>
                <Text className='font-bold text-xl text-gray-800'>Physics</Text>
                <Text className='font-bold'>50 questions</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard

const styles = StyleSheet.create({
    mainContainer: {
        width: width / (columns + 0.2),
        height: width / (columns + 0.2),
    }
})