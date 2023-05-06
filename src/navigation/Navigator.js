import {SafeAreaView, StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialIcons, Feather} from '@expo/vector-icons';

import {Main, Calorie, Coach, Account} from '../screens'
import AccountNavigator from './AccountNavigator';
import { ROUTES } from '../components';

const Tab = createBottomTabNavigator();

export default Navigator = () => {
    return (
        
        <Tab.Navigator 
            screenOptions={{
                tabBarActiveTintColor: '#58754B',
                headerTitleAlign: 'center',
                headerTintColor: '#574327',
                headerStyle: {
                    backgroundColor: '#93C47D',
                }
            }}
        >

            <Tab.Screen
                name="Home"
                component={Main}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={35} />
                    ) 
                }}
            />

            <Tab.Screen
                name={ROUTES.CALORIE}
                component={Calorie}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="restaurant" color={color} size={35} />
                        
                    ) 
                }}
            />

            <Tab.Screen
                name={ROUTES.COACH}
                component={Coach}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="headphones" color={color} size={35} />
                        
                    ) 
                }}
            />

            <Tab.Screen
                name={"Profile"}
                component={AccountNavigator}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" color={color} size={35} />
                        
                    ) 
                }}
            />

        </Tab.Navigator>
        
    );
};

const styles = StyleSheet.create({
  
});

