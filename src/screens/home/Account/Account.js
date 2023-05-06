import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  Image, 
  View, 
  SafeAreaView, 
  ActivityIndicator, 
  TouchableOpacity, 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import {ROUTES, CustomInput, CustomButton} from '../../../components'
import useAuth from '../../../hooks/useAuth';

import defaultAvatar from '../../../../assets/avatars/defaultAvatar.jpeg'

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
    <SafeAreaView style={styles.root}>
      
      <View style={styles.img_container}>
        <Image style={styles.image} source={avatar ? {uri: avatar} : defaultAvatar}/>

        <TouchableOpacity style={{}} onPress={pickImage}>
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.info_container}>
          <Text style={styles.main_text}>Hello, {user.username}</Text>
          <Text style={styles.text}>Age: {user.age}</Text>
          <Text style={styles.text}>Height: {user.height} (cm)</Text>
          <Text style={styles.text}>Weight: {user.weight} (kg)</Text>
          <Text style={styles.text}>Gender: {user.gender}</Text>
          <Text style={styles.text}>Your activity: {user.activity}</Text>
          <Text style={styles.text}>Your goal: {user.goal}</Text>
      </View>

      <View style={styles.container}>

        <CustomButton text='Change information' type='SETTING' onPress={() => navigation.navigate(ROUTES.CHANGE_INFO)}/>

        <View style={styles.footer}>
          <CustomButton text='Log out' onPress={handlLogout} type='TERTIARY'/>
        </View>
        
      </View>
    </SafeAreaView>
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
    padding: 10,
    gap: 5,
  },
  img_container: {
    alignItems: 'center',
    marginTop: '2%',
  },
  main_text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {

  },
  footer: {
    marginTop: '5%'
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#0B8D76',
    borderWidth: 2,
  }
});