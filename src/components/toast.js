import React from 'react';
import Toast from 'react-native-toast-message';

export const showToast = (message) => {
    Toast.show({
        type: 'success',
        text1: message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
    });
};