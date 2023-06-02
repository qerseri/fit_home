import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator} from "react-native";
import React, { useEffect, useState } from "react";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/core";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ROUTES } from "../../../components";
import { AntDesign } from '@expo/vector-icons';

export default function Calorie({ route }) {
  const { userId } = route.params;
  const navigation = useNavigation();

  const [documents, setDocuments] = useState([]);
  const [pressedIndex, setPressedIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const foodCollectionRef = collection(firestore, "users", userId, "food");

    const unsubscribe = onSnapshot(foodCollectionRef, (snapshot) => {
      const updatedDocuments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedDocuments = updatedDocuments.sort((a, b) => b.date.localeCompare(a.date));
      setDocuments(sortedDocuments);

    });
    setLoaded(true)
    return () => {
      unsubscribe();
    };
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.item,
          {
            backgroundColor:
              pressed || pressedIndex === index ? "#82947A" : "#A3B999",
          },
        ]}
        onPress={() =>
          navigation.navigate(ROUTES.MEALS_HISTORY, { userId, date: item.date })
        }
      >
        
      <Text style={styles.dateText}>
        {format(new Date(item.date), "d MMMM, EEEE", { locale: ru })}
      </Text>

      </Pressable>
    );
  };


  return (
    <View style={styles.root}>
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <AntDesign name="calendar" size={35} color="black" />
      </View>

      <View style={styles.container}>
        {!loaded ? <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/> : (
          <FlatList
            data={documents}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 15
  },
  container: {
    flex: 1,
    backgroundColor: "#CECECE",
    padding: 10,
    borderRadius: 5
  },
  dateText: {
    textAlign: "center",
    fontSize: 20,
  },
  item: {
    padding: 30,
    marginVertical: 10,
    borderRadius: 5,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#E5E5E5'
  },
});