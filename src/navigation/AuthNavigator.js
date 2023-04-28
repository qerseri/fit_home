import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name="Log in" component={LoginScreen} />
            <Stack.Screen name="Sign up" component={RegisterScreen} />
            <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    );
}