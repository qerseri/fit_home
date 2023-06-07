import {SafeAreaView, StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialIcons, Feather} from '@expo/vector-icons';
import AccountNavigator from './AccountNavigator';
import HomeNavigator from './HomeNavigator';
import CoachNavigator from './CoachNavigator';
import CalorieNavigator from './CalorieNavigator';

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
                component={HomeNavigator}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={35} />
                    ) 
                }}
            />

            <Tab.Screen
                name="Calorie counting"
                component={CalorieNavigator}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="restaurant" color={color} size={35} />
                        
                    ) 
                }}
            />

            <Tab.Screen
                name="List coaches"
                component={CoachNavigator}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
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

