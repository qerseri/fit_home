import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {Main, WorkoutScreen, FitScreen, RestScreen} from '../screens'
import { ROUTES } from '../components';

const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();

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
      initialRouteName={ROUTES.MAIN}
    >
      <Stack.Screen name={ROUTES.MAIN} component={Main}/>
      <Stack.Screen name={ROUTES.WORKOUT_SCREEN} component={WorkoutScreen}/>
      <Stack.Screen name={ROUTES.FIT_SCREEN} component={FitScreen}/>
      <Stack.Screen name={ROUTES.REST_SCREEN} component={RestScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});