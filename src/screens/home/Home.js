import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

const Home = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
        
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
    }
});
