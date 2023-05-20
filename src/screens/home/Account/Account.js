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
import { ref, uploadBytes, getDownloadURL, deleteObject, } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase";

import { signOut } from 'firebase/auth';
import { auth, storage } from '../../../config/firebase';
import {ROUTES, CustomInput, CustomButton} from '../../../components'
import useAuth from '../../../hooks/useAuth';

import logo from '../../../../assets/images/logo.png'

export default Account = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
 
  useEffect(() => {
    if (user) {
      setImage(user.avatar);
    }
  }, [user]);

  const Change = async () => {
    await deleteImage();
    await pickImage();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const uploadURL = await uploadImageAsync(selectedAsset.uri);
      if (uploadURL) {
        setImage(uploadURL);
        try {
          const userRef = doc(firestore, `users/${user.uid}`);
          await updateDoc(userRef, {
            avatar: uploadURL,
          });
        } catch (err) {
          console.log("got error: ", err.message);
        }
      }
    } else {
      setImage(null);
    }
  };

  const uploadImageAsync = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      const storageRef = ref(storage, `avatars/image-${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.log(`Error: ${error}`);
      alert(`Error: ${error}`);
      return null;
    }
  };

  const deleteImage = async () => {
    const deleteRef = ref(storage, image);
    try {
      await deleteObject(deleteRef);
      setImage(null);
      try {
        const userRef = doc(firestore, `users/${user.uid}`);
        await updateDoc(userRef, {
          avatar: null,
        });
      } catch (err) {
        console.log("got error: ", err.message);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      alert(`Error: ${error}`);
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
          {!image ? (
            <Image style={styles.image} source={logo} />
          ) : (
              <Image style={styles.image} source={{ uri: image }} />
          )}

          <TouchableOpacity style={{}} onPress={Change}>
            <MaterialIcons name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.main_text}>{user.firstname} {user.lastname}</Text>
        <Text style={styles.main_text}>{user.email}</Text>
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
