import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, ROUTES} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const OtpCode = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.row}>
                        <Image source={require('../../assets/images/logof.png')} width={50} height={50} style={styles.mr7} />
                        <Text style={styles.brandName}>EMERIT</Text>
                    </View>

                    <Text style={styles.loginContinueTxt}>Check your Email and enter OTP</Text>
                    <TextInput style={styles.input} placeholder="OTP" />

                    <View style={styles.loginBtnWrapper}>
                        <LinearGradient
                        colors={[COLORS.gradientForm, COLORS.primary]}
                        style={styles.linearGradient}
                        start={{y: 0.0, x: 0.0}}
                        end={{y: 1.0, x: 0.0}}>
                        {/******************** FINISH BUTTON *********************/}
                        <TouchableOpacity
                            onPress={() => navigation.navigate(ROUTES.LOGIN)}
                            activeOpacity={0.7}
                            style={styles.loginBtn}>
                            <Text style={styles.loginText}>Finish Registration</Text>
                        </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OtpCode

const styles = StyleSheet.create({
    main: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
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
      opacity: 0.9,
    },
    loginContinueTxt: {
      fontSize: 21,
      textAlign: 'center',
      color: COLORS.gray,
      marginBottom: 16,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.grayLight,
      padding: 15,
      marginVertical: 10,
      borderRadius: 5,
      height: 55,
      paddingVertical: 0,
    },
    // Login Btn Styles
    loginBtnWrapper: {
      height: 55,
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    linearGradient: {
      width: '100%',
      borderRadius: 50,
    },
    loginBtn: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 55,
    },
    loginText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: '400',
    },
    forgotPassText: {
      color: COLORS.primary,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 15,
    },
    // footer
    footer: {
      position: 'absolute',
      bottom: 20,
      textAlign: 'center',
      flexDirection: 'row',
    },
    footerText: {
      color: COLORS.gray,
      fontWeight: 'bold',
    },
    signupBtn: {
      color: COLORS.primary,
      fontWeight: 'bold',
    },
    // utils
    wFull: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    mr7: {
      marginRight: 7,
      width: 50,
      height: 50
    },
});  