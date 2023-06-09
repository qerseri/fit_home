import { View, Text, FlatList, Pressable, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

import { firebase } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/core";
import { ROUTES } from "../../../components";
import useAuth from '../../../config/useAuth';

import logo from "../../../../assets/images/logo.png";

export default ListCoaches = () => {
  const { user } = useAuth();
  const [coaches, setCoaches] = useState([]);

  const db = firebase.firestore();
  const navigation = useNavigation();
  const [pressedIndex, setPressedIndex] = useState(null);
  
  
  useEffect(() => {
    const unsubscribe = db.collection("instructors").onSnapshot((snapshot) => {
      const coachesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoaches(coachesData);
    });
    
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item, index }) => {
    const handlePressIn = () => {
      setPressedIndex(index);
    };

    const handlePressOut = () => {
      setPressedIndex(null);
    };

    return (
      <Pressable
        style={({ pressed }) => [
          styles.item,
          {
            backgroundColor:
              pressed || pressedIndex === index ? "#949494" : "#B9B9B9",
          },
        ]}
        onPress={() => navigation.navigate(ROUTES.COACH, { coach: item, coachId: item.id})}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={{flexDirection: 'row', gap: 30}}>
          <Image 
            style={styles.image} 
            source={item.avatar ? { uri: item.avatar } : logo}
          />

          <View>
            <Text style={styles.title}>{item.firstName} {item.lastName}</Text>
            <Text style={styles.subtitle}>{item.email}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  
  if (!user) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
    );
  } 

  return ( 
    <View style={styles.root}>

      <View style={styles.container}>
        <CustomButton text='Заявки' type='BLUE_PRIMARY' onPress={() => navigation.navigate(ROUTES.QUERY_FOR_COACH)}/>
      </View>

      <View style={{}}>
        <FlatList
          data={coaches}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

  </View>
    
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingBottom: 60
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
    color: '#133337'
  },
  subtitle: {
    fontSize: 18,
    color: '#133337'
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
    backgroundColor: '#E5E5E5'
  },
});