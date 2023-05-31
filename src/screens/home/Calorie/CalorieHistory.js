import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

import { collection, getDoc, doc, query, where, getDocs } from "firebase/firestore";
import { firebase } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/core";

import { firestore } from '../../../config/firebase';
import useAuth from '../../../config/useAuth';

export default CalorieHistory = () => {

  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const today = new Date().toISOString().split('T')[0];

 useEffect (() => {
  
  const fetchMeals = async () => {
    if (user) {
      try {
        const userRef = doc(firestore, "users", user.uid);
        const foodRef = collection(userRef, "food");
        const dateRef = doc(foodRef, today);
        const mealsRef = collection(dateRef, "meals");
        const querySnapshot = await getDocs(mealsRef);
  
        const mealsData = querySnapshot.docs.map((doc) => doc.data());
        setMeals(mealsData);
      } catch (error) {
        console.log("Error fetching meals:", error);
      }
    }
  };

  fetchMeals();
 }, [user])

  if (!user) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
    );
  } 

  return (
    <View style={styles.container}>

      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <View style={styles.meal_container}>
            <Text style={styles.food_text}>{item.food}</Text>
            <Text style={styles.mealInfo_text}>Calorie: {item.calorie}</Text>
            <Text style={styles.mealInfo_text}>Meal Type: {item.mealType}</Text>
            <Text style={styles.mealInfo_text}>Timestamp: {item.timestamp}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        /* keyExtractor={(item) => item.uid} */
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  meal_container: {
    backgroundColor: "#B0D3A1",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  food_text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mealInfo_text: {
    fontSize: 16,
    marginVertical: 3,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#B0D3A1'
  },
});