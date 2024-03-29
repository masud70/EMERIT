import React, { useState } from 'react';
import { COLORS, CONSTANT, ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import style from '../../../styles/style.scss';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button
} from 'react-native';
import { FUNCTIONS } from '../../helpers';
import { useMutation } from '@apollo/client';
import { SEND_OTP_MUTATION, VERIFY_OTP_MUTATION } from '../../graphql/query';
import { ScrollView } from 'react-native';
import { REGISTER_USER } from '../../graphql/userQuery';
import Loading from '../../components/utilities/Loading';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verified, setVerified] = useState(0);
    const [otp, setOtp] = useState('');
    const navigation = useNavigation();

    const [sendOtp, { loading: sendLoading }] = useMutation(SEND_OTP_MUTATION);
    const [verify, { loading: otpLoading }] = useMutation(VERIFY_OTP_MUTATION);
    const [registerUser, { loading: registerLoading }] = useMutation(REGISTER_USER);

    const handleSendOtp = async () => {
        try {
            if (email) {
                const result = await sendOtp({ variables: { email: email } });
                const {
                    sendMailOtp: { status, message }
                } = result.data;

                FUNCTIONS.showToast2(status, message);
                if (status) setVerified(1);
            } else FUNCTIONS.showToast2(false, 'Email cannot be empty.');
        } catch (error) {
            console.log(error.message);
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    const verifyOtp = async val => {
        try {
            setOtp(val);
            if (val.length === 6) {
                const result = await verify({ variables: { email: email, otp: val } });
                const {
                    verifyOtp: { status, message }
                } = result.data;

                FUNCTIONS.showToast2(status, message);

                if (status) setVerified(3);
                else setVerified(2);
            }
        } catch (error) {
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword || password.length === 0 || name.length === 0)
                throw new Error('Check all the fields.');
            if (verified !== 3) throw new Error('Email is not verified.');

            const result = await registerUser({ variables: { email, password, name } });

            const {
                registerUser: { status, message }
            } = result.data;

            FUNCTIONS.showToast2(status, message);
            if (status) navigation.navigate(ROUTES.LOGIN);
        } catch (error) {
            console.log(error);
            FUNCTIONS.showToast2(false, error.message);
        }
    };

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.wFull}>
                        <View style={styles.row}>
                            <Image
                                source={require('../../assets/images/logof.png')}
                                width={50}
                                height={50}
                                style={styles.mr7}
                            />
                            <Text style={styles.brandName}>{CONSTANT.APP_NAME}</Text>
                        </View>

                        <Text style={styles.loginContinueTxt}>Register a new account</Text>
                        <View className="w-full flex flex-row items-center justify-center rounded overflow-hidden">
                            <TextInput
                                className={`w-[80%] border ${
                                    verified === 3
                                        ? 'border-green-500'
                                        : verified === 2
                                        ? 'border-red-500'
                                        : ''
                                } rounded-r-none py-0 my-0`}
                                onChangeText={value => {
                                    setVerified(0);
                                    setEmail(value);
                                }}
                                value={email}
                                style={styles.input}
                                placeholder="Email"
                                returnKeyType="send"
                            />
                            <View className="w-[20%] h-[60px] flex justify-center">
                                <Button
                                    className="w-full rounded-l-none rounded-r h-[60px] text-center"
                                    title="Send OTP"
                                    color="#7d5fff"
                                    onPress={handleSendOtp}
                                />
                            </View>
                        </View>

                        {verified === 1 && (
                            <TextInput
                                value={otp}
                                placeholder="OTP"
                                style={styles.input}
                                onChangeText={verifyOtp}
                            />
                        )}

                        <TextInput
                            onChangeText={value => setName(value)}
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                        />
                        <TextInput
                            onChangeText={value => setPassword(value)}
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                        />
                        <TextInput
                            onChangeText={value => setConfirmPassword(value)}
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                        />

                        <View className="w-full flex bg-slate-500 flex-row justify-between rounded overflow-hidden">
                            <TouchableOpacity
                                className="w-1/2 p-3"
                                onPress={() => navigation.navigate(ROUTES.LOGIN)}
                                activeOpacity={0.3}>
                                <Text style={style.btn}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="w-1/2 p-3"
                                style={style.bg_primary}
                                onPress={handleRegister}
                                activeOpacity={0.3}>
                                <Text style={[style.btn]}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Loading loading={registerLoading || otpLoading || sendLoading} />
        </SafeAreaView>
    );
};

export default Register;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    container: {
        padding: 15,
        width: '100%',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    brandName: {
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.primary,
        opacity: 0.9
    },
    loginContinueTxt: {
        fontSize: 21,
        textAlign: 'center',
        color: COLORS.gray,
        marginBottom: 16,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        height: 55,
        paddingVertical: 0
    },
    // Login Btn Styles
    loginBtnWrapper: {
        height: 55,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5
    },
    googleLoginBtnWrapper: {
        height: 55,
        marginTop: 12,
        // shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: COLORS.light,
        overflow: 'hidden'
    },
    linearGradient: {
        width: '100%',
        borderRadius: 50
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        marginTop: -2
    },
    loginText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '500'
    },
    googleLoginText: {
        color: COLORS.dark,
        fontSize: 16,
        fontWeight: '500'
    },
    forgotPassText: {
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15
    },
    // footer
    footer: {
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
        flexDirection: 'row'
    },
    footerText: {
        color: COLORS.gray,
        fontWeight: 'bold'
    },
    signupBtn: {
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    // utils
    wFull: {
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    mr7: {
        marginRight: 7,
        width: 50,
        height: 50
    },
    orTxt: {
        textAlign: 'center',
        paddingTop: 7,
        fontWeight: 'bold',
        color: 'gray',
        fontSize: 17
    }
});
