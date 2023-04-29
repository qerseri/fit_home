import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Login, Register, ForgotPassword} from '../screens'
import { ROUTES } from '../components';
import Navigator from './Navigator';

const Stack = createStackNavigator();

export default AuthNavigator = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTintColor: 'white',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#93C47D'
                }
            }} 
            initialRouteName={ROUTES.LOGIN}
        >
            <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{headerShown:false}}/>
            <Stack.Screen name={ROUTES.REGISTER} component={Register} />
            <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
            <Stack.Screen name={ROUTES.MAIN} component={Navigator}/>
        </Stack.Navigator>
    );
}