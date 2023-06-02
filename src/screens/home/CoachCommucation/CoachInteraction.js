import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView, Alert} from "react-native";
import React, { useState, useEffect } from "react";

import { Entypo } from '@expo/vector-icons';
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove, onSnapshot, deleteDoc, collection, getDocs, deleteField} from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { firebase } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/core";

import useAuth from '../../../config/useAuth';
import { ROUTES } from "../../../components";

export default CoachInteraction = () => {

  const { user } = useAuth();
  const [coach, setCoach] = useState(null);
  const [coachId, setCoachId] = useState(null);

  const db = firebase.firestore();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(firestore, `users/${user.uid}`), (doc) => {
        const userData = doc.data();
        if (userData && userData.coach !== undefined && userData.coach !== null) {
          setCoachId(userData.coach)
        }
      });
      return () => unsubscribe();
    }
   }, [user])

   useEffect(() => {
    if (coachId !== null) {
      const fetchCoachData = async () => {
        const coachRef = doc(db, "instructors", coachId);
        const docSnap = await getDoc(coachRef);
        if (docSnap.exists()) {
          setCoach(docSnap.data());
        }
      };
      fetchCoachData();
    }
  }, [coachId]);

  const handleCancel = async() => {
      try {
        setLoading(true)

        const coachRef = doc(firestore, `instructors/${coachId}`);
        const userRef = doc(firestore, `users/${user.uid}`);
        
        // Получение ссылки на подколлекцию messages
        const messagesCollectionRef = collection(firestore, `chats/${user.chat}/messages`);
        // Получение всех документов в подколлекции
        const snapshot = await getDocs(messagesCollectionRef);
        // Удаление каждого документа в подколлекции
        snapshot.docs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        // Удаление подколлекции messages
        await deleteField(doc(firestore, 'chats', user.chat), 'messages');
        await deleteDoc(doc(firestore, 'chats', user.chat));

        await updateDoc(coachRef, {
          clients: arrayRemove(user.uid),
          chat: arrayRemove(user.chat),
        });
        await updateDoc(userRef, {
          coach: null,
          chat: null
        });

        alert('Вы были отвязаны от тренера')
      } catch (err) {
        console.log('error for sign up with coach: ', err.message)
      } finally {
        setLoading(false)
    } 
  }

  const showAlert = () => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите отписаться от вашего тренера?',
      [
        {
          text: 'Да',
          onPress: () => {handleCancel()},
        },
        {
          text: 'Нет',
          style: 'cancel',
          onPress: () => {
            console.log('Нет');
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  if (!coach) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
    );
  }

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.COACH, { coach: coach, coachId: coachId})}>
          <Image 
            style={styles.image} 
            source={coach.avatar ? { uri: coach.avatar } : logo}
          />
        </TouchableOpacity>
        
        <Text style={styles.main_text}>{coach.firstName} {coach.lastName}</Text>
        <Text style={styles.main_text}>{coach.email}</Text>
        
      </View>

      <View style={{alignItems: 'center'}}>
        <View style={styles.chat_container}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CHAT)}>
            <Entypo name="chat" size={45} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info_container}>
        <Text style={styles.text}>Индивидуальный план:</Text>
      </View>

      
      

      <View style={{padding: 30}}>
        <CustomButton 
          text={loading ? <ActivityIndicator size="small" color="white" /> : 'Отвязаться от тренера'} 
          onPress={showAlert}
          type='CANCEL_PRIMARY'
        />
      </View>
    </ScrollView>
  );
};

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
    backgroundColor: '#8CA880',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    gap: 3,
    height: 200,
  },
  chat_container: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    borderColor: '#B9B9B9',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B9B9B9',
    margin: '3%'
  },
  item: {
    backgroundColor: "#58754B",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  main_text: {
    color: '#627559',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    borderColor: '#0B8D76',
    borderWidth: 2,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#E5E5E5'
  },
});