import { View, Text, FlatList, Pressable, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

import { doc, updateDoc, getDoc, arrayUnion, arrayRemove, onSnapshot} from "firebase/firestore";
import { firestore } from "../../../config/firebase";

import useAuth from '../../../config/useAuth';

import logo from "../../../../assets/images/logo.png";

export default Coach = ({route}) => {

  const { user } = useAuth();
  const {coach, coachId} = route.params;

  const [loading, setLoading] = useState(false);
  const [queryLoading, setQueryLoading] = useState(false);

  const [isQuerySent, setIsQuerySent] = useState(false);
  const [coachQuery, setCoachQuery] = useState(null);

  useEffect(() => {

    if (user) {
      setQueryLoading(true);
      const unsubscribe = onSnapshot(doc(firestore, `users/${user.uid}`), (doc) => {
        const userData = doc.data();
        if (userData && userData.coachQuery !== undefined && userData.coachQuery !== null) {
          setIsQuerySent(true);
          setCoachQuery(userData.coachQuery);
        } else {
          setIsQuerySent(false)
          setCoachQuery(null);
        }
      });

      setQueryLoading(false);
      return () => unsubscribe();
    }
  }, [user]);

  const handleSubmit = async() => {
    if (!isQuerySent) {
      try {
        setLoading(true)
        const coachRef = doc(firestore, `instructors/${coach.id}`);
        const userRef = doc(firestore, `users/${user.uid}`);
        await updateDoc(coachRef, {
          clientQuery: arrayUnion(user.uid),
        });
        await updateDoc(userRef, {
          coachQuery: coach.id,
        });
        setIsQuerySent(true);
        setCoachQuery(coach.id);
      } catch (err) {
        console.log('error for sign up with coach: ', err.message)
      } finally {
        setLoading(false)
      }
    } else {
      alert('У вас уже есть активный запрос')
    }
  }

  const handleCancel = async() => {
    if (isQuerySent) {
      try {
        setLoading(true)
        const coachRef = doc(firestore, `instructors/${coach.id}`);
        const userRef = doc(firestore, `users/${user.uid}`);
        await updateDoc(coachRef, {
          clientQuery: arrayRemove(user.uid),
        });
        await updateDoc(userRef, {
          coachQuery: null,
        });
        setIsQuerySent(false);
        setCoachQuery(null);
      } catch (err) {
        console.log('error for sign up with coach: ', err.message)
      } finally {
        setLoading(false)
      }
    } else {
      alert('У вас уже есть активный запрос')
    }
  }

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      
      <View style={styles.container}>
        <Image 
          style={styles.image} 
          source={coach.avatar ? { uri: coach.avatar } : logo}
        />

        <Text style={styles.main_text}>{coach.firstName} {coach.lastName}</Text>
        <Text style={styles.main_text}>{coach.email}</Text>
      </View>

      <View style={styles.info_container}>
        <Text style={styles.text}>Пол: {coach.gender == 'Male' ? 'Мужчина' : 'Женщина'}</Text>
        <Text style={styles.text}>Возраст: {coach.age}</Text>
        <Text style={styles.text}>Описание: {coach.description}</Text>
      </View>

      

      {queryLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View>
          {(coachId == coachQuery || coachQuery == null) ? (
            <View>
              {isQuerySent ? (
                <View style={styles.container}>
                  <Text style={styles.main_text}>Запрос отправлен</Text>
                  <CustomButton 
                    text={loading ? <ActivityIndicator size="small" color="white" /> : 'Отменить запрос'} 
                    onPress={handleCancel}
                    type='CANCEL_PRIMARY'
                  />
                </View>
              ) : (
                <View style={styles.container}>
                  <CustomButton 
                    text={loading ? <ActivityIndicator size="small" color="white" /> : 'Записаться'} 
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </View>
          ) : (
            <View>
              {isQuerySent ? (
                <View style={styles.container}>
                  <Text style={styles.main_text}>У вас уже есть активный запрос</Text>
                </View>
              ) : (
                <View style={styles.container}>
                  <CustomButton 
                    text={loading ? <ActivityIndicator size="small" color="white" /> : 'Записаться'} 
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </View>
          )}
        </View> 
      )}
      

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
    marginTop: '5%',
  },
  info_container: {
    backgroundColor: '#8CA880',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    gap: 3,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#0B8D76',
    borderWidth: 2,
  },
  main_text: {
    color: '#133337',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    color: 'white'
  }
});