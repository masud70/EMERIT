import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Category = ({item}) => {
    const navigation = useNavigation();
    return (
        <LinearGradient colors={['rgb(182, 244, 146)', 'rgb(51, 139, 147)']} className='bg-slate-200 h-fit w-5/12 p-3 rounded flex justify-center items-center space-y-3'>
            <TouchableOpacity onPress={()=>navigation.navigate(item.route)}>
                <View className="bg-slate-100 rounded-full p-2 flex justify-center items-center">
                    <Icon name={item.icon} size={60} color={COLORS.primary}/>
                </View>
                <View className='flex items-start justify-start w-full'>
                    <Text className='font-bold'>{item.head}</Text>
                    <Text className='font-bold text-2xl'>{item.name}</Text>
                    <Text className='font-bold text-gray-400'>{item.questionCount} questions</Text>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default Category

const styles = StyleSheet.create({
})

// background-image: linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147));