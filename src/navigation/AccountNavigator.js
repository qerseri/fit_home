import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Account, ChangeInfo} from '../screens'
import { ROUTES } from '../components';

const Stack = createStackNavigator();

export default AuthNavigator = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTintColor: '#574327',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#93C47D',
                }
            }} 
            initialRouteName={ROUTES.ACCOUNT}
        >
            <Stack.Screen name={ROUTES.ACCOUNT} component={Account} />
            <Stack.Screen name={ROUTES.CHANGE_INFO} component={ChangeInfo} />
        </Stack.Navigator>
    );
}