import Toast from 'react-native-toast-message';

export default {
    showToast: (type, t1, t2) => {
        Toast.show({
            type: type,
            text1: t1,
            text2: t2
        });
    }
};
