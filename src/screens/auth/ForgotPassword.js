import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';
import { COLORS, ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import style from '../../../styles/style.scss';
import { AuthContext } from '../../contexts/authContext';
import functions from '../../helpers/functions';

const ForgotPassword = () => {
    const navigation = useNavigation();
    const auth = useContext(AuthContext);
    const handler = () => {
        console.log(auth.loginStatus);
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

                    <Text style={style.mediumText}>
                        Forgot your password? Enter your Email here.
                    </Text>
                    <TextInput style={styles.input} placeholder="Email" />

                    <View className="w-full flex bg-slate-500 flex-row justify-between rounded overflow-hidden">
                        <TouchableOpacity
                            className="w-full p-3"
                            style={style.bg_primary}
                            onPress={() => registerHandler()}
                            activeOpacity={0.3}>
                            <Text style={[style.btn]}>Request Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    main: {
        flex: 2,
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
        justifyContent: 'center',
        paddingBottom: 20
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
        marginTop: 20,
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
    }
});
