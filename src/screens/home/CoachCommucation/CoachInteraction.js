import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView, Alert} from "react-native";
import React, { useState, useEffect } from "react";

import AwesomeAlert from 'react-native-awesome-alerts';
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
  const [plan, setPlan] = useState('');

  const db = firebase.firestore();
  const navigation = useNavigation();
  const [alertWindow, setAlertWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPlan, setIsPlan] = useState(false);

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

  useEffect(() => {
    if (user) {
      const planRef = collection(firestore, `connection/${user.connection}/plan`);
    
      const unsubscribe = onSnapshot(planRef, (snapshot) => {
        const planData = snapshot.docs[0]?.data();
        // Обновление состояния "plan" с помощью данных из документа
        setPlan(planData?.plan);
      });
  
      return () => unsubscribe();
    }
    
  }, [user]);

  useEffect(() => {
    if (plan) {
      setIsPlan(true);
    } else {
      setIsPlan(false);
    }
  }, [plan]);

  const handleCancel = async() => {
      try {
        setAlertWindow(false);
        setLoading(true);

        const coachRef = doc(firestore, `instructors/${coachId}`);
        const userRef = doc(firestore, `users/${user.uid}`);
        
        // Получение ссылки на подколлекцию messages
        const chatCollectionRef = collection(firestore, `connection/${user.connection}/chat`);
        // Получение всех документов в подколлекции
        const snapshot = await getDocs(chatCollectionRef);
        // Удаление каждого документа в подколлекции
        snapshot.docs.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        // Удаление подколлекции chat
        await deleteField(doc(firestore, 'connection', user.connection), 'chat');
        await deleteDoc(doc(firestore, 'connection', user.connection));

        await updateDoc(coachRef, {
          clients: arrayRemove(user.uid),
          connection: arrayRemove(user.connection),
        });
        await updateDoc(userRef, {
          coach: null,
          connection: null
        });

        alert('Вы были отвязаны от тренера')
      } catch (err) {
        console.log('error for sign up with coach: ', err.message)
      } finally {
        setLoading(false)
    } 
  }

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
        {!isPlan ? (
          <Text style={{textAlign: 'center', marginTop: '15%'}}>Пока отсутствует</Text>
        ) : (
            <Text>{plan}</Text>
        )}
      </View>

      <View style={{padding: 30}}>
        <CustomButton 
          text={loading ? <ActivityIndicator size="small" color="white" /> : 'Отвязаться от тренера'} 
          onPress={() => setAlertWindow(true)}
          type='CANCEL_PRIMARY'
        />
      </View>

      <AwesomeAlert
        show={alertWindow}
        title="Подтверждение"
        titleStyle={{
          fontSize: 20,
          color:'#133337'
        }}
        message="Вы действительно хотите отписаться от тренера? Вся перепика будет удалена"
        messageStyle={{
          fontSize: 16
        }}

        showConfirmButton={true}
        confirmText="Да"
        confirmButtonColor="#A76C63"
        confirmButtonStyle={{
          width:'50%',
          alignItems:'center',
          justifyContent:'center',
          borderRadius: 25,
        }}
        confirmButtonTextStyle={{
          fontSize: 16,
          fontWeight: 'bold'
        }}
        onConfirmPressed={handleCancel}

        showCancelButton={true}
        cancelText="Нет"
        cancelButtonColor="#86A280"
        cancelButtonStyle={{
          width:'50%',
          alignItems:'center',
          justifyContent:'center',
          borderRadius: 25,
        }}
        cancelButtonTextStyle={{
          fontSize: 16,
          fontWeight: 'bold'
        }}
        onCancelPressed={() => setAlertWindow(false)}
      />
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
    gap: 4,
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