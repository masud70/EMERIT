import { View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_CONTEST_BY_USER_ID_QUERY } from '../../../graphql/query';
import Item from '../../../components/contest/Item';
import Wraper from '../../../components/utilities/Wraper';
import FlatButton from '../../../components/utilities/FlatButton';
import { FAB } from 'react-native-paper';

const ContestSectionHome = () => {
    const navigation = useNavigation();
    let auth = useSelector(st => st.auth);

    const { loading, data, refetch } = useQuery(GET_CONTEST_BY_USER_ID_QUERY, {
        variables: { token: auth.token }
    });

    return (
        <>
            <Wraper head={'Contest Dashboard'} refresh={{ loading, refetch }}>
                <FlatButton
                    title="Create A New Contest"
                    style={'mb-1'}
                    onPress={() => navigation.navigate(ROUTES.AUTHOR_CONTEST_CREATE)}
                />
                <View className="">
                    {data?.getContestByUserId.map((item, idx) => (
                        <Item data={item} key={idx} route={ROUTES.AUTHOR_CONTEST_EDIT} />
                    ))}
                </View>
            </Wraper>
            <FAB
                variant="surface"
                icon="plus"
                className="m-5 absolute right-0 bottom-0"
                onPress={() => navigation.navigate(ROUTES.AUTHOR_CONTEST_CREATE)}
            />
        </>
    );
};

export default ContestSectionHome;
