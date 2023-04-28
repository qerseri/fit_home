import {SafeAreaView, StyleSheet,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//screens
import MainScreen from '../screens/home/MainScreen'
import CalorieScreen from '../screens/home/CalorieScreen'
import InfoScreen from '../screens/home/InfoScreen'
import AccountScreen from '../screens/home/AccountScreen'

const Tab = createBottomTabNavigator();

export default Navigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Feed" screenOptions={{headerShown: false , tabBarActiveTintColor: '#9381ff'}}>

                <Tab.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" color={color} size={35} />
                        ) 
                    }}
                />

                <Tab.Screen
                    name="CalorieScreen"
                    component={CalorieScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="restaurant" color={color} size={35} />
                            
                        ) 
                    }}
                />

                <Tab.Screen
                    name="InfoScreen"
                    component={InfoScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="leaderboard" color={color} size={35} />
                            
                        ) 
                    }}
                />

                <Tab.Screen
                    name="AccountScreen"
                    component={AccountScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person" color={color} size={35} />
                            
                        ) 
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  
});

