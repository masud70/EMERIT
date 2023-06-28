import { View, Text } from 'react-native';
import React from 'react';
import Wraper from '../../../components/utilities/Wraper';
import Accordion from './Accordion';
import { useQuery } from '@apollo/client';
import { GET_ALL_PENDING_REQUEST } from '../../../graphql/superAdmin';
import { useSelector } from 'react-redux';

const AdminRequest = () => {
    const auth = useSelector(st => st.auth);

    const { loading, error, data, refetch } = useQuery(GET_ALL_PENDING_REQUEST, {
        variables: { token: auth.token }
    });

    return (
        <>
            <Wraper head={'Admin Request'} refresh={{ loading, refetch }}>
                <Text className="w-full text-center bg-slate-400 p-2 font-bold text-base rounded">
                    {data?.getAllPendingRequest.length} pending Request(s)
                </Text>
                {data?.getAllPendingRequest.map((item, idx) => (
                    <Accordion key={idx} data={item} refetch={refetch} />
                ))}
            </Wraper>
        </>
    );
};

export default AdminRequest;
