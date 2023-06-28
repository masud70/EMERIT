import React, { useEffect } from 'react';
import { CONSTANT, ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setContestData } from '../../redux/state/contestSlice';
import { io } from 'socket.io-client';
import Item from '../../components/contest/Item';
import { useQuery } from '@apollo/client';
import { GET_ALL_CONTEST_QUERY } from '../../graphql/query';
import Wraper from '../../components/utilities/Wraper';
const socket = io(CONSTANT.BASE_URL, { transports: ['websocket'] });

const Contest = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { loading, error, data, refetch } = useQuery(GET_ALL_CONTEST_QUERY);

    const loadContest = () => {
        const url = CONSTANT.BASE_URL + '/contest/getAll';
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            }
        })
            .then(r => r.json())
            .then(res => {
                console.log(res);
                if (res.status) {
                    dispatch(setContestData({ data: res.data }));
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        loadContest();
    }, []);

    useEffect(() => {
        socket.off('loadContest').on('loadContest', () => loadContest());
    }, [socket]);

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
