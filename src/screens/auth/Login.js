import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/state/auth/loginSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //login handler
    const loginHandler = () => {
        dispatch(login());
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
                        <Text style={styles.brandName}>EMERIT</Text>
                    </View>

                    <Text style={styles.loginContinueTxt}>
                        Login in to continue
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder="Password"
                    />

                    {/******************** LOGIN BUTTON *********************/}
                    <View style={styles.loginBtnWrapper}>
                        <LinearGradient
                            colors={[COLORS.gradientForm, COLORS.primary]}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }}
                            end={{ y: 1.0, x: 0.0 }}>
                            <TouchableOpacity
                                onPress={() => loginHandler()}
                                activeOpacity={0.7}
                                style={styles.loginBtn}>
                                <Text style={styles.loginText}>Log In</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    {/***************** FORGOT PASSWORD BUTTON *****************/}
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                                email: email
                            })
                        }
                        style={styles.forgotPassBtn}>
                        <Text style={styles.forgotPassText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>

                {/******************** REGISTER BUTTON *********************/}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(ROUTES.REGISTER)}>
                        <Text style={styles.signupBtn}>Register Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

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
    linearGradient: {
        width: '100%',
        borderRadius: 50
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55
    },
    loginText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '400'
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
        fontWeight: 'bold',
        marginRight: 5
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
    }
});
