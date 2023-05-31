import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

import { firebase } from "../../../config/firebase";
import { firestore } from "../../../config/firebase";
import { ROUTES } from "../../../components";
import useAuth from '../../../config/useAuth';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { doc, getDoc, onSnapshot } from "firebase/firestore";


export default QueryForCoach = () => {
  const { user } = useAuth();
  const [coach, setCoach] = useState(null);
  const [coachId, setCoachId] = useState(null);

  const db = firebase.firestore();
  const navigation = useNavigation();

   useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(firestore, `users/${user.uid}`), (doc) => {
        const userData = doc.data();
        if (userData && userData.coachQuery !== undefined && userData.coachQuery !== null) {
          setCoachId(userData.coachQuery)
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

  if (!coach) {
    return (
      <View style={styles.root}>
        <View style={{alignItems: 'center', marginTop: '50%'}}>
          <Text style={{fontSize: 22}}>Активных запросов не имеется</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.root}>
      
      <View style={styles.container}>
        <Text style={{fontSize: 16}}>Ожидание рассмотрения заявки</Text>
        <MaterialIcons name="query-builder" size={40} color="black" />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.item,
          {
            backgroundColor:
              pressed ? "#68825D" : "#58754B",
          },
        ]}
        onPress={() => navigation.navigate(ROUTES.COACH, { coach: coach, coachId: coachId})} 
      >
        <View style={{flexDirection: 'row', gap: 30}}>
          <Image 
            style={styles.image} 
            source={coach.avatar ? { uri: coach.avatar } : logo}
          />

          <View>
            <Text style={styles.title}>{coach.firstName} {coach.lastName}</Text>
            <Text style={styles.subtitle}>{coach.email}</Text>
          </View>
        </View>
      </Pressable>
    </View>
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
  item: {
    backgroundColor: "#58754B",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  subtitle: {
    fontSize: 15,
    color: '#CCCCCC'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 90/2,
    borderColor: '#0B8D76',
    borderWidth: 2,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#93C47D'
  },
});