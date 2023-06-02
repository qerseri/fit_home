import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator} from 'react-native';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import {ROUTES, CustomInput, CustomButton} from '../../components'
import { useNavigation } from '@react-navigation/native';

export default ForgotPassword = () => {
  const navigation = useNavigation();
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');

  const resetPassword = async() => {

    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, email)
      navigation.navigate(ROUTES.LOGIN)
      alert("On your email was sent recovery link");
    } catch(err) {
      switch(err.code) {
        case 'auth/missing-email':
          setErrorText('Email is empty');
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
    } finally {
      setLoading(false)
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

        <CustomButton 
          text={loading ? <ActivityIndicator size="small" color="white" /> : 'Отправить'} 
          onPress={resetPassword}
        />

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
