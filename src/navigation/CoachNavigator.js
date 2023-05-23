import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {ListCoaches, Coach, QueryForCoach, CoachInteraction} from '../screens'
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
                },
                
            }} 
            initialRouteName={ROUTES.LIST_COACHES}
        >
            <Stack.Screen name={ROUTES.LIST_COACHES} component={ListCoaches} />
            <Stack.Screen name={ROUTES.COACH} component={Coach} />
            <Stack.Screen name={ROUTES.QUERY_FOR_COACH} component={QueryForCoach} />
            <Stack.Screen name={ROUTES.COACH_INTERACTION} component={CoachInteraction} options={{headerLeft: null}}/>
        </Stack.Navigator>
    );
}