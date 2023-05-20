import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {ListCoaches, Coach} from '../screens'
import { ROUTES } from '../components';

const Stack = createStackNavigator();

export default CoachNavigator = () => {
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
            initialRouteName={ROUTES.LIST_COACHES}
        >
            <Stack.Screen name={ROUTES.LIST_COACHES} component={ListCoaches} />
            <Stack.Screen name={ROUTES.COACH} component={Coach} />
        </Stack.Navigator>
    );
}