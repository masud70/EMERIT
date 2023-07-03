import React from 'react';
import { CONSTANT, ROUTES } from '../../constants';
import { io } from 'socket.io-client';
import Item from '../../components/contest/Item';
import { useQuery } from '@apollo/client';
import { GET_ALL_CONTEST_QUERY } from '../../graphql/query';
import Wraper from '../../components/utilities/Wraper';
const socket = io(CONSTANT.BASE_URL, { transports: ['websocket'] });

const Contest = () => {
    const { loading, data, refetch } = useQuery(GET_ALL_CONTEST_QUERY);

    return (
        <>
            <Wraper head="Contest" refresh={{ loading, refetch }} bottomPadding>
                {data?.getAllContest.map((item, idx) => (
                    <Item data={item} key={idx} route={ROUTES.CONTEST_DETAILS} />
                ))}
            </Wraper>
        </>
    );
};

export default Contest;
