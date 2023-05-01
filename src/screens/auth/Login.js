import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {ROUTES, CustomInput, CustomButton} from '../../components'

import logo from '../../../assets/images/logo.png'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default Login = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async() => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                setLoginError('')
            } catch(err) {
                console.log('got error: ', err.message)
            }
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <Image 
                    source={logo} 
                    style={[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain"
                />

                <CustomInput 
                    placeholder='Email' 
                    value={email} 
                    setValue={text => setEmail(text)}
                />
                <CustomInput 
                    placeholder='Password' 
                    value={password} 
                    setValue={text => setPassword(text)}
                    secureTextEntry={true}
                />

                <Text style={(loginError) ? styles.errorText : {display: 'none'}}>{loginError}</Text>
                <CustomButton text='Sign In' onPress={handleSubmit}/>
                <CustomButton text='Forgot Password' onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)} type='SECONDARY'/>

                <View style={styles.footer}>
                    <Text style={{color: 'gray', fontWeight: 'bold'}}> Don't have an account? </Text>
                    <CustomButton text='Sign Up' onPress={() => navigation.navigate(ROUTES.USER_PARAMETERS)} type='TERTIARY'/>
                </View>
                
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        height: '100%',
        backgroundColor: '#93C47D',
    },
    container: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '65%',
        maxWidth: 300,
        maxHeight: 200,
    },
    footer: {
        position: 'absolute',
        bottom: '-5%',
        textAlign: 'center',
        flexDirection: 'row',
    },
    errorText: {
        color: '#E32E2E',
    }
});