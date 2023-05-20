import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Calorie, CalorieHistory, WaterBalance} from '../screens'
import { ROUTES } from '../components';

const Stack = createStackNavigator();

export default CalorieNavigator = () => {
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
            initialRouteName={ROUTES.CALORIE}
        >
            <Stack.Screen name={ROUTES.CALORIE} component={Calorie} />
            <Stack.Screen name={ROUTES.CALORIE_HISTORY} component={CalorieHistory} />
            <Stack.Screen name={ROUTES.WATER_BALANCE} component={WaterBalance} />
        </Stack.Navigator>
    );
}