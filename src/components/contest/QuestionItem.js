import { View, Text } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const QuestionItem = ({ data, answer, setAnswer }) => {
    const { width } = useWindowDimensions();

    return (
        <View className="w-full bg-slate-200 rounded overflow-hidden mb-2">
            <View className="w-full flex flex-row border-b border-slate-500">
                <View className="w-1/12 bg-slate-700 p-1 flex justify-center items-center">
                    <Text className="text-white font-bold">{data.sl + 1}</Text>
                </View>
                <Text className="w-11/12 p-1 font-semibold">{data.title}</Text>
            </View>
            <View className="p-2 w-full">
                <RenderHtml source={{ html: data.description }} contentWidth={width} />
            </View>
            <View className="w-full bg-slate-500">
                <RadioButton.Group
                    value={answer[data.id]}
                    onValueChange={val => setAnswer(pre => ({ ...pre, [data.id]: val }))}
                    className="w-full space-y-1">
                    {data.Options.map((item, idx) => (
                        <View className="w-full flex flex-row items-center bg-slate-300" key={idx}>
                            <RadioButton value={item.value} />
                            <Text className="font-bold">
                                {String.fromCharCode(65 + idx)}. {item.value}
                            </Text>
                        </View>
                    ))}
                </RadioButton.Group>
            </View>
        </View>
    );
};

export default QuestionItem;
