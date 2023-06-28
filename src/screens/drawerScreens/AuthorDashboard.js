import React, { useEffect } from 'react';
import Section from '../../components/Author/Section';
import { ROUTES } from '../../constants';
import Wraper from '../../components/utilities/Wraper';
import Card from '../../components/utilities/Card';
import { TextInput } from 'react-native';
import FlatButton from '../../components/utilities/FlatButton';
import { useMutation, useQuery } from '@apollo/client';
import { GET_IS_ADMIN } from '../../graphql/userQuery';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { REQUEST_ADMIN } from '../../graphql/superAdmin';
import { FUNCTIONS } from '../../helpers';
import { useNavigation } from '@react-navigation/native';

const AuthorDashboard = () => {
    const [requestMessage, setRequestMessage] = useState('');
    const navigation = useNavigation();
    const auth = useSelector(st => st.auth);

    const {
        loading: adminLoading,
        data: adminData,
        refetch: adminRefetch
    } = useQuery(GET_IS_ADMIN, { variables: { token: auth.token } });
    const [requestAdmin, { loading: reqLoading, error: reqError, data: reqData }] =
        useMutation(REQUEST_ADMIN);

    const handleRequest = async () => {
        try {
            await requestAdmin({
                variables: {
                    token: auth.token,
                    requestMessage: requestMessage
                }
            });
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    useEffect(() => {
        if (reqData) {
            FUNCTIONS.showToast2(reqData.adminRequest.status, reqData.adminRequest.message);
            if (reqData.adminRequest.status) navigation.goBack();
        }
    }, [reqData]);

    return (
        <>
            <Wraper
                head="Author Dashboard"
                refresh={{ loading: adminLoading, refetch: adminRefetch }}>
                {adminData?.getIsAdmin.isAdmin ? (
                    <>
                        <Section
                            data={{ sectionName: 'Contest Section', icon: 'trophy' }}
                            route={ROUTES.AUTHOR_CONTEST}
                        />
                        <Section
                            data={{ sectionName: 'Question Section', icon: 'help-circle' }}
                            route={ROUTES.AUTHOR_QUESTION}
                        />
                        {adminData?.getIsAdmin.isSuperAdmin ? (
                            <>
                                <Section
                                    data={{
                                        sectionName: 'Admin Request',
                                        icon: 'md-git-pull-request'
                                    }}
                                    route={ROUTES.ADMIN_REQUEST}
                                />
                            </>
                        ) : null}
                    </>
                ) : (
                    <Card title={'Apply for host a contest'}>
                        <TextInput
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            placeholder="Write message..."
                            className="border rounded text-base px-2 mb-1"
                            value={requestMessage}
                            onChangeText={setRequestMessage}
                        />
                        <FlatButton onPress={handleRequest} title="Apply" />
                    </Card>
                )}
            </Wraper>
        </>
    );
};

export default AuthorDashboard;
