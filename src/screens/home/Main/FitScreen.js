import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
  } from "react-native";
  import React, { useState, useContext } from "react";

  import { useNavigation, useRoute } from "@react-navigation/native";
  import { FitnessItems } from "../../../../Context";
  
  const FitScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [index, setIndex] = useState(0);
    const excersise = route.params.excersises;
    const current = excersise[index];
    
    const {
      completed,
      setCompleted,
      minutes,
      setMinutes,
      calories,
      setCalories,
      setWorkout,
      workout,
    } = useContext(FitnessItems);

    const pressedDone = () => {
      navigation.navigate("Rest");
      setCompleted([...completed, current.name]);
      setWorkout(workout + 1);
      setMinutes(minutes + 2.5);
      setCalories(calories + 6.3);
      setTimeout(() => {
        setIndex(index + 1);
      }, 2000);
    }

    const pressedPrev = () => {
      /* navigation.navigate("Rest");
  
      setTimeout(() => {
        setIndex(index - 1);
      }, 2000); */
      setIndex(index - 1);
    }

    const pressedSkip = () => {
      /* navigation.navigate("Rest");
  
      setTimeout(() => {
        setIndex(index + 1);
      }, 2000); */
      setIndex(index + 1);
    }

    console.log(completed, "completed excersise");

    return (
      <SafeAreaView style={styles.root}>

        <Image style={{ width: "50%", height: '40%', marginVertical: 10}} source={{ uri: current.image }}/>
  
        <Text style={styles.text}>{current.name}</Text>
        <Text style={styles.text}>x{current.sets}</Text>
        
        <View>
          {index + 1 >= excersise.length ? (
            <CustomButton text='DONE' onPress={() => navigation.navigate("Fit Home")}/>
          ) : (
            <CustomButton text='DONE' onPress={pressedDone}/>
          )}
        </View>

        <View style={styles.container}>
          <View>
            {index == 0 ? (
              <CustomButton text='PREV' onPress={() => {}} type='BLUE_PRIMARY'/>
            ) : (
              <CustomButton text='PREV' onPress={pressedPrev} type='BLUE_PRIMARY'/>
            )}
          </View>
          
          <View>
            {index + 1 >= excersise.length ? (
              <CustomButton text='SKIP' onPress={() => navigation.navigate("Fit Home")} type='BLUE_PRIMARY'/>
            ) : (
              <CustomButton text='SKIP' onPress={pressedSkip} type='BLUE_PRIMARY'/>
            )}
          </View>
        </View>
  
        {/* <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
          }}
        >
          <Pressable
            disabled={index === 0}
            onPress={() => {
              navigation.navigate("Rest");
  
              setTimeout(() => {
                setIndex(index - 1);
              }, 2000);
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              PREV
            </Text>
          </Pressable>

          {index + 1 >= excersise.length ? (
            <Pressable
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 20,
                marginHorizontal: 20,
                width: 100,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SKIP
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                navigation.navigate("Rest");
  
                setTimeout(() => {
                  setIndex(index + 1);
                }, 2000);
              }}
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 20,
                marginHorizontal: 20,
                width: 100,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SKIP
              </Text>
            </Pressable>
          )}
        </Pressable> */}

      </SafeAreaView>
    );
  };
  
  export default FitScreen;
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#B0D3A1',
      alignItems: 'center'
    },
    container: {
      backgroundColor: '#B0D3A1',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 30, 
      gap: 50,
    },
    text: {
      marginLeft: "auto", 
      marginRight: "auto", 
      marginVertical: 5, 
      fontSize: 25, 
      fontWeight: "bold",
    },
  });