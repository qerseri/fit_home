import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator} from "react-native";
import React, { useState, useEffect } from "react";

import { doc, updateDoc, getDoc, arrayUnion, arrayRemove, onSnapshot} from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { firebase } from "../../../config/firebase";

import useAuth from '../../../hooks/useAuth';

export default CoachInteraction = () => {

  const { user } = useAuth();
  const [coach, setCoach] = useState(null);
  const [coachId, setCoachId] = useState(null);

  const db = firebase.firestore();
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
        await updateDoc(coachRef, {
          clients: arrayRemove(user.uid),
        });
        await updateDoc(userRef, {
          coach: null,
        });
        alert('Вы были отвязаны от тренера')
      } catch (err) {
        console.log('error for sign up with coach: ', err.message)
      } finally {
        setLoading(false)
    } 
  }
  
  if (!user) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
    );
  } 

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <CustomButton 
          text={loading ? <ActivityIndicator size="small" color="white" /> : 'Отвязаться от тренера'} 
          onPress={handleCancel}
          type='CANCEL_PRIMARY'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B0D3A1',
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
    fontSize: 25,
  },
  subtitle: {
    fontSize: 15,
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
    backgroundColor: '#93C47D'
  },
});