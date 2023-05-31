import 'react-native-gesture-handler';
import React, {useRef, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import AuthNavigator from './src/navigation/AuthNavigator';

import useAuth from './src/config/useAuth';
import { FitnessContext } from './Context';
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
    <FitnessContext>
      <NavigationContainer>
        {renderNavigator()}
        {/* {<Toast ref={(ref) => Toast.setRef(ref)} />} */}
      </NavigationContainer>
    </FitnessContext>
  )
}

const styles = StyleSheet.create({
  
});
