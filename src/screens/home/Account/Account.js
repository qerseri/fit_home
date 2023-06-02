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
import { getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../config/firebase";

import { signOut } from 'firebase/auth';
import { auth, storage } from '../../../config/firebase';
import {ROUTES, CustomInput, CustomButton} from '../../../components'
import useAuth from '../../../config/useAuth';

import logo from '../../../../assets/images/logo.png'

export default Account = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');
  
  useEffect(() => {
    if (user) {
      try {
        setImage(user.avatar);

        const userRef = doc(firestore, `users/${user.uid}`);
        const unsubscribe = onSnapshot(userRef, async (snapshot) => {
          setFirstname(snapshot.data().firstname)
          setLastname(snapshot.data().lastname)
          setAge(snapshot.data().age)
          setHeight(snapshot.data().height)
          setWeight(snapshot.data().weight)
          setGender(snapshot.data().gender)
          setActivity(snapshot.data().activity)
          setGoal(snapshot.data().goal)
        });

        console.log('account listener')
        return () => unsubscribe();

      } catch(err) {
        console.log('user fetching data error: ', err)
      }
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

        <Text style={styles.main_text}>{firstname} {lastname}</Text>
        <Text style={styles.main_text}>{user.email}</Text>
      </View>
    
      <View style={styles.info_container}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.text}>Возраст: </Text>
          <Text style={styles.text_info}>{age}</Text>
        </View>

        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.text}>Рост: </Text>
          <Text style={styles.text_info}>{height} см</Text>
        </View>

        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.text}>Вес: </Text>
          <Text style={styles.text_info}>{weight} кг</Text>
        </View>

        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.text}>Пол: </Text>
          <Text style={styles.text_info}>{gender == 'Male' ? 'Мужской' : 'Женский'}</Text>
        </View>

        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.text}>Активность: </Text>
          <Text style={styles.text_info}>{activity}</Text>
        </View>

        <View style={{flexDirection: 'row', gap: 5}}>
          <Text style={styles.text}>Цель: </Text>
          <Text style={styles.text_info}>{goal}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <CustomButton text='Изменить данные' onPress={() => navigation.navigate(ROUTES.CHANGE_INFO)}/>
        <CustomButton text='Активность и цель' onPress={() => navigation.navigate(ROUTES.CHANGE_ACTIVITY)}/>
      </View>
      
      <View style={styles.footer}>
        <CustomButton text='Выйти' onPress={handlLogout} type='BLUE_PRIMARY'/>
      </View>

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
  info_container: {
    backgroundColor: '#A3B999',
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
    color: '#133337',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 16
  },
  text_info: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#133337'
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
    backgroundColor: '#E5E5E5'
  },
});
