import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

import { collection, getDoc, doc, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../../../config/firebase';
import useAuth from '../../../config/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default CalorieHistory = ({ route }) => {

  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const { userId } = route.params;
  const { date } = route.params;
  const [totalCalories, setTotalCalories] = useState(0);

 useEffect (() => {
  
  const fetchMeals = async () => {
    if (user) {
      try {
        const userRef = doc(firestore, "users", user.uid);
        const foodRef = collection(userRef, "food");
        const dateRef = doc(foodRef, date);
        const mealsRef = collection(dateRef, "meals");
        const querySnapshot = await getDocs(mealsRef);
  
        const mealsData = querySnapshot.docs.map((doc) => doc.data());
        setMeals(mealsData);

        // Преобразование строковых значений в числа
        const mealsDataWithCaloriesAsNumbers = mealsData.map((item) => ({
          ...item,
          calorie: parseInt(item.calorie),
        }));
        // Вычисление суммы калорий
        const totalCalories = mealsDataWithCaloriesAsNumbers.reduce((sum, item) => sum + item.calorie, 0);
        setTotalCalories(totalCalories);
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
    <View style={styles.root}>
      <Text style={styles.totalCalories}>Общее количество калорий: {totalCalories}</Text>

      <View style={{alignItems: 'center', marginBottom: 10}}>
        <MaterialCommunityIcons name="food-drumstick" size={35} color="#993D3D" />
      </View>
      
      <View style={styles.container}>
        <FlatList
          data={meals}
          renderItem={({ item }) => (
            <View style={styles.meal_container}>
              <Text style={styles.food_text}>{item.food}</Text>
              <Text style={styles.mealInfo_text}>Калории: {item.calorie}</Text>
              <Text style={styles.mealInfo_text}>Тип приема: {item.mealType}</Text>
              <Text style={styles.mealInfo_text}>Время: {item.timestamp}</Text>
            </View>
          )}
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
    padding: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#CECECE',
    padding: 10,
    borderRadius: 5
  },
  meal_container: {
    backgroundColor: '#B0D3A1',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  food_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#133337'
  },
  mealInfo_text: {
    fontSize: 16,
    marginVertical: 3,
  },
  totalCalories: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: '#133337'
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#E5E5E5'
  },
});