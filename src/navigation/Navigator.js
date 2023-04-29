import {SafeAreaView, StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Main, Calorie, Info, Account} from '../screens'
import { ROUTES } from '../components';

const Tab = createBottomTabNavigator();

export default Navigator = () => {
    return (
        
        <Tab.Navigator 
            screenOptions={{
                tabBarActiveTintColor: '#58754B',
                headerTitleAlign: 'center',
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
                name={ROUTES.INFO}
                component={Info}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="leaderboard" color={color} size={35} />
                        
                    ) 
                }}
            />

            <Tab.Screen
                name={ROUTES.ACCOUNT}
                component={Account}
                options={{
                    tabBarShowLabel: false,
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

