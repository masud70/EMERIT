import { View, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { Avatar, IconButton } from 'react-native-paper';
import { useState } from 'react';
import { BASE_URL } from '@env';
import { useMutation } from '@apollo/client';
import { RESOLVE_ADMIN_REQUEST } from '../../../graphql/superAdmin';
import { FUNCTIONS } from '../../../helpers';
import { useSelector } from 'react-redux';
import Loading from '../../../components/utilities/Loading';

const Accordion = ({ data, refetch }) => {
    const auth = useSelector(st => st.auth);
    const [open, setOpen] = useState(false);

    const [resolve, { loading, data: resolveData }] = useMutation(RESOLVE_ADMIN_REQUEST);

    const handleResolve = async status => {
        try {
            await resolve({
                variables: {
                    id: data?.id,
                    status: status,
                    token: auth.token
                }
            });
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    useEffect(() => {
        if (resolveData) {
            FUNCTIONS.showToast2(
                resolveData.resolveAdminRequest.status,
                resolveData.resolveAdminRequest.message
            );
            if (resolveData.resolveAdminRequest.status) refetch();
        }
    }, [resolveData]);

    return (
        <>
            <Pressable
                onPress={() => setOpen(pre => !pre)}
                className="w-full rounded overflow-hidden border border-[#2B3467] mb-1">
                <View className="w-full bg-[#2B3467] py-1 px-2 flex flex-row items-center space-x-2">
                    <View className="w-[10%] justify-center items-center">
                        <Avatar.Image size={27} source={{ uri: BASE_URL + data?.User.avatar }} />
                    </View>
                    <Text className="w-[65%] text-white font-bold text-base">
                        {data?.User.name}
                    </Text>
                    <IconButton
                        className="w-[10%] m-0 bg-slate-200"
                        size={20}
                        icon="check-bold"
                        iconColor="#16FF00"
                        onPress={() => handleResolve('accepted')}
                    />
                    <IconButton
                        className="w-[10%] m-0 bg-slate-200"
                        size={20}
                        iconColor="#FF6969"
                        icon="close-thick"
                        onPress={() => handleResolve('rejected')}
                    />
                </View>
                <View className={`${!open && 'hidden'} w-full px-2 py-1`}>
                    <View>
                        <Text className="font-bold text-base text-[#2B3467] border-b border-[#2B3467]">
                            Message:
                        </Text>
                        <Text className="text-[15px] bg-slate-100 rounded-b p-1">
                            {data?.requestMessage}
                        </Text>
                    </View>
                </View>
            </Pressable>
            <Loading loading={loading} />
        </>
    );
};

export default Accordion;
