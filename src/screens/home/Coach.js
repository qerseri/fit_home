/* import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default Coach = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>trener</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B0D3A1',
  },
});
 */

import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../config/firebase";
import { useNavigation } from "@react-navigation/core";

export default Coach = () => {
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
              pressed || pressedIndex === index ? "#68825D" : "#58754B",
          },
        ]}
        onPress={() => navigation.navigate("PersonStack", { user: item })}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.title}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.subtitle}>{item.email}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Coaches:</Text>

      <FlatList
        data={coaches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0D3A1',
  },
  item: {
    backgroundColor: "#58754B",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
  },
});