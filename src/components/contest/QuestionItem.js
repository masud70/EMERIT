import { View, Text } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const QuestionItem = ({ data, answer, setAnswer }) => {
    const { width } = useWindowDimensions();

    return (
        <View className="w-full rounded overflow-hidden border border-[#2B3467] mb-2">
            <View className="w-full flex flex-row bg-[#2B3467]">
                <View className="w-[7%] p-1 justify-center items-center border-r border-white">
                    <Text className="text-white font-bold text-base">{data.sl + 1}</Text>
                </View>
                <Text className="w-[93%] p-2 font-bold text-base text-white">{data.title}</Text>
            </View>
            <View className="p-2 w-full bg-white min-h-[100px]">
                <RenderHtml source={{ html: data.description }} contentWidth={width} />
            </View>
            <View className="w-full bg-[#ffffff] border-t border-[#2B3467]">
                <RadioButton.Group
                    value={answer[data.id]}
                    onValueChange={val => setAnswer(pre => ({ ...pre, [data.id]: val }))}
                    className="w-full space-y-1">
                    {data.Options.map((item, idx) => (
                        <RadioButton.Item
                            key={idx}
                            className="w-full flex flex-row items-center bg-slate-200 py-1 text-xs"
                            label={String.fromCharCode(65 + idx) + '. ' + item.value}
                            value={item.value}
                        />
                    ))}
                </RadioButton.Group>
            </View>
        </View>
    );
};

export default QuestionItem;
