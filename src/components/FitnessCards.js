import { StyleSheet, Text, View, Pressable, Image, ScrollView } from "react-native";
import React from "react";

import fitness from "../../assets/FitData/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {ROUTES, CustomInput, CustomButton} from '../components'

const FitnessCards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {FitnessData.map((item, key) => (

        <Pressable
          onPress={() => navigation.navigate(ROUTES.WORKOUT_SCREEN,{
            image:item.image,
            excersises:item.excersises,
            id:item.id,
          })}
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >
          <Image style={{width: "95%", height: 140, borderRadius: 10 }} source={{ uri: item.image }}/>

          <Text style={{position: "absolute", color: "white", fontSize: 16, fontWeight: "bold", left: 20, top: 20,}}>{item.name}</Text>

          {/* <MaterialCommunityIcons
            style={{ position: "absolute", color: "white", bottom: 15,left:20 }}
            name="lightning-bolt"
            size={24}
            color="black"
          /> */}
        </Pressable>

      ))}
    </ScrollView>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});