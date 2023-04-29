import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import useAuth from './src/hooks/useAuth';

export default App = () => {
  const {user} = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthNavigator/>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  
});
