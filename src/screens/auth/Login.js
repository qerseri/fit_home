import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  SafeAreaView,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {ROUTES, CustomInput, CustomButton} from '../../components'

import logo from '../../../assets/images/logo.png'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default Login = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');

    useEffect(() => {
        setLoginError('')
    }, [email, password, navigation.navigate])

    const loginSubmit = async() => {
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
        } catch(err) {
            switch(err.code) {
                case 'auth/missing-email':
                    setLoginError('Email is empty');
                    break;
                case 'auth/invalid-email':
                    setLoginError('Email is incorrect');
                    break;
                case 'auth/user-not-found':
                    setLoginError('Email not exist');
                    break;
                case 'auth/wrong-password':
                    setLoginError('Wrong password');
                    break;
                default:
                    setLoginError('Something went wrong. Try again')
                    break;
            }
            console.log('got error: ', err.message)
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
                    placeholder='Почта' 
                    value={email} 
                    setValue={text => setEmail(text)}
                />
                <CustomInput 
                    placeholder='Пароль' 
                    value={password} 
                    setValue={text => setPassword(text)}
                    secureTextEntry={true}
                />

                <Text style={(loginError) ? styles.errorText : {display: 'none'}}>{loginError}</Text>

                <CustomButton 
                    text={loading ? <ActivityIndicator size="small" color="white" /> : 'Войти'}
                    onPress={loginSubmit}
                />

                <CustomButton text='Не могу вспомнить пароль' onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)} type='SECONDARY'/>

                <View style={styles.footer}>
                    <Text style={{color: 'gray', fontWeight: 'bold', marginTop: '1%'}}> У вас нет аккаунта? </Text>
                    <CustomButton text='Создайте' onPress={() => navigation.navigate(ROUTES.USER_PARAMETERS)} type='TERTIARY'/>
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
        color: '#F85376',
    }
});