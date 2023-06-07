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
    Image
} from 'react-native';
import { FUNCTIONS } from '../../helpers';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    //register handler
    const registerHandler = () => {
        if (password !== confirmPassword || password.length === 0 || name.length === 0) {
            alert('Check all the fields.');
        } else {
            FUNCTIONS.register({ email, password, name })
                .then(res => {
                    console.log(res);
                    FUNCTIONS.showToast(
                        res.status ? 'success' : 'error',
                        res.status ? 'Success' : 'Error',
                        res.message
                    );
                    if (res.status) {
                        navigation.navigate(ROUTES.LOGIN);
                    }
                })
                .catch(err => FUNCTIONS.showToast('error', 'Error', err.message));
        }
    };

    return (
        <SafeAreaView style={styles.main}>
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
                    <TextInput
                        onChangeText={value => setEmail(value)}
                        style={styles.input}
                        placeholder="Email"
                    />
                    <TextInput
                        onChangeText={value => setName(value)}
                        style={styles.input}
                        placeholder="Name"
                    />
                    <TextInput
                        onChangeText={value => setPassword(value)}
                        style={styles.input}
                        placeholder="Password"
                    />
                    <TextInput
                        onChangeText={value => setConfirmPassword(value)}
                        style={styles.input}
                        placeholder="Confirm Password"
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
                            onPress={() => registerHandler()}
                            activeOpacity={0.3}>
                            <Text style={[style.btn]}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
