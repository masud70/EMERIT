import { Pressable, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';
import { UPDATE_DATA } from '../../graphql/userQuery';
import { FUNCTIONS } from '../../helpers';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

const UpdateDataCard = ({
    placeholder,
    value,
    onChangeText,
    rightIcon,
    field,
    iconColor,
    refetch,
    updateCheck,
    checkMessage,
    editable
}) => {
    const auth = useSelector(st => st.auth);

    const [updateNow, { loading }] = useMutation(UPDATE_DATA);

    const updateHandler = async () => {
        try {
            if (updateCheck) throw new Error(checkMessage);

            const result = await updateNow({ variables: { token: auth.token, field, value } });
            const { status, message } = result.data.updateData;

            FUNCTIONS.showToast2(status, message);
            if (status) refetch();
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    return (
        <View className="flex flex-row items-center">
            <TextInput
                editable={editable}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className="px-2 py-1 border rounded-l border-r-0 w-[88%]"
            />
            {loading ? (
                <View className="w-[12%] border h-full rounded-r items-center flex-row justify-center">
                    <ActivityIndicator size={30} />
                </View>
            ) : (
                <Pressable
                    onPress={updateHandler}
                    className="w-[12%] border h-full rounded-r items-center flex-row justify-center">
                    <Icon name={rightIcon} size={30} color={iconColor} />
                </Pressable>
            )}
        </View>
    );
};

export default UpdateDataCard;
