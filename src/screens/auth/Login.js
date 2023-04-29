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

export default Login = () => {
    const navigation = useNavigation();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
                <Image 
                    source={logo} 
                    style={[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain"
                />

                <CustomInput 
                    placeholder='Login' 
                    value={login} 
                    setValue={setLogin}
                    secureTextEntry={false}
                />
                <CustomInput 
                    placeholder='Password' 
                    value={password} 
                    setValue={setPassword}
                    secureTextEntry={true}
                />

                <CustomButton text='Sign In' onPress={() => navigation.navigate(ROUTES.MAIN)}/>
                <CustomButton text='Forgot Password' onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)} type='SECONDARY'/>

                <View style={styles.footer}>
                    <Text style={{color: 'gray', fontWeight: 'bold'}}> Don't have an account? </Text>
                    <CustomButton text='Sign Up' onPress={() => navigation.navigate(ROUTES.REGISTER)} type='TERTIARY'/>
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
        bottom: 0,
        textAlign: 'center',
        flexDirection: 'row',
    }
});