import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Login, Register, ForgotPassword, UserParameters, ActivityAndGoal} from '../screens'
import { ROUTES } from '../components';

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
            <Stack.Screen name={ROUTES.USER_PARAMETERS} component={UserParameters} />
            <Stack.Screen name={ROUTES.ACTIVITY_AND_GOAL} component={ActivityAndGoal} />
        </Stack.Navigator>
    );
}