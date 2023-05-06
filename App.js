import 'react-native-gesture-handler';
import React, {useRef, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import AuthNavigator from './src/navigation/AuthNavigator';

import useAuth from './src/hooks/useAuth';
/* import Toast from 'react-native-toast-message'; */

export default App = () => {
  const {user} = useAuth();

  const renderNavigator = () => {
    if (user) {
      return <Navigator />;
    } else {
      return <AuthNavigator />;
    }
  }

  return (
    <NavigationContainer>
        {renderNavigator()}
        {/* {<Toast ref={(ref) => Toast.setRef(ref)} />} */}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  
});
