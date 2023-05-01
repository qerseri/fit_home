import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import {ROUTES, CustomInput, CustomButton} from '../../components'
import { useNavigation } from '@react-navigation/native';

import { showToast } from '../../components/toast';

export default ForgotPassword = () => {
  const navigation = useNavigation();
  const toastRef = useRef(null);
  const [errorText, setErrorText] = useState('');

  const [email, setEmail] = useState('');

  const resetPassword = async() => {
      try {
        await sendPasswordResetEmail(auth, email)
        navigation.navigate(ROUTES.LOGIN)
        alert("On your email was sent recovery link");
      } catch(err) {
        switch(err.code) {
          case 'auth/missing-email':
            /* setErrorText('Email is empty'); */
            showToast('Email is empty')
            break
          case 'auth/invalid-email':
            setErrorText('Email is incorrect');
            break
          case 'auth/user-not-found':
            setErrorText('Email not exist');
            break
          default:
            setErrorText('Something went wrong. Try again')
            break
        }
      }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>

        <CustomInput 
          placeholder='Email' 
          value={email} 
          setValue={text => setEmail(text)}
          secureTextEntry={false}
        />

        <Text style={styles.errorText}>{errorText}</Text>
        <CustomButton text='Send a recovery link' onPress={resetPassword}/>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: '#FDF7F3',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color:'#F85376'
  },
});
