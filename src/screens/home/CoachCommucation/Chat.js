import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  Image, 
  View, 
  SafeAreaView, 
  ActivityIndicator, 
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import {ROUTES, CustomInput, CustomButton} from '../../../components'
import useAuth from '../../../config/useAuth';

import logo from '../../../../assets/images/logo.png'

export default Account = () => {
  const { user } = useAuth();
 
  if (!user) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
    );
  } 

  return (
    
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <Text>chat</Text>
    </ScrollView>
    
    
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  container: {
    alignItems: 'center',
    padding: 5,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#93C47D'
  },
});