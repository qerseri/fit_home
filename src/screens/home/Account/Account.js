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
import * as ImagePicker from 'expo-image-picker';

import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import {ROUTES, CustomInput, CustomButton} from '../../../components'
import useAuth from '../../../hooks/useAuth';

import defaultAvatar from '../../../../assets/avatars/defaultAvatar2.jpeg'
import logo from '../../../../assets/images/logo.png'

export default Account = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null)
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);
  
    if (!result.canceled) {
      setAvatar(result.uri)
    }
  };

  const handlLogout = async() => {
    await signOut(auth)
  }

  if (!user) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
    );
  } 

  return (
    
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
    
      <View style={styles.container}>
        <View style={styles.img_container}>

          <Image style={styles.image} source={avatar ? {uri: avatar} : logo}/>

          <TouchableOpacity style={{}} onPress={pickImage}>
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <Text style={styles.main_text}>{user.firstname} {user.lastname}</Text>
      </View>
    
      <View style={styles.info_container}>
          <Text style={styles.text}>Возраст: {user.age}</Text>
          <Text style={styles.text}>Рост: {user.height} (cm)</Text>
          <Text style={styles.text}>Вес: {user.weight} (kg)</Text>
          <Text style={styles.text}>Пол: {user.gender}</Text>
          <Text style={styles.text}>Активность: {user.activity}</Text>
          <Text style={styles.text}>Цель: {user.goal}</Text>
      </View>

      <View style={styles.container}>
        <CustomButton text='Change information' onPress={() => navigation.navigate(ROUTES.CHANGE_INFO)}/>
        <CustomButton text='Activity and Goal' onPress={() => navigation.navigate(ROUTES.CHANGE_ACTIVITY)}/>
      </View>
      
      <View style={styles.footer}>
        <CustomButton text='Log out' onPress={handlLogout} type='BLUE_PRIMARY'/>
      </View>

    </ScrollView>
    
    
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B0D3A1',
  },
  container: {
    alignItems: 'center',
    padding: 5,
  },
  info_container: {
    backgroundColor: '#8CA880',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    gap: 3,
  },
  img_container: {
    alignItems: 'flex-end',
    marginTop: '2%',
    gap: -20
  },
  main_text: {
    color: '#627559',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {

  },
  footer: {
    padding: 5,
    marginTop: '3%'
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#0B8D76',
    borderWidth: 2,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#93C47D'
  },
});
