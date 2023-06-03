import { StyleSheet, Text, View, SafeAreaView, Image,ScrollView } from "react-native";
import React ,{useContext, useEffect} from "react";
import FitnessCards from "../../../components/FitnessCards";
import { FitnessItems, FitnessContext } from "../../../../Context";

const Main = () => {
  
  const {
    minutes,
    calories,
    workout,
  } = useContext(FitnessItems);

  return (
   
    <SafeAreaView style={styles.root}>

      <View style={styles.container}>
        <View>
          <Text style={styles.text_num}>{workout}</Text>
          <Text style={styles.text}>WORKOUTS</Text>
        </View>

        <View>
          <Text style={styles.text_num}>{calories}</Text>
          <Text style={styles.text}>KCAL</Text>
        </View>

        <View>
          <Text style={styles.text_num}>{minutes}</Text>
          <Text style={styles.text}>MINS</Text>
        </View>
      </View>

      <View style={styles.coach_container}>

      </View>

      <FitnessCards/>

    </SafeAreaView>
    
  );
};

export default Main;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 10
  },
  container: {
    flexDirection: "row",  
    justifyContent: "space-between", 
    marginVertical: 10,
    backgroundColor: '#58754B',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  coach_container: {

  },
  text: {
    color: "#D0D0D0", 
    fontSize: 16, 
  },
  text_num: {
    textAlign: "center", 
    fontWeight: "bold", 
    color: "white", 
    fontSize: 18,
  }
});


/* import { StyleSheet, Text, View, SafeAreaView, Image,ScrollView } from "react-native";
import React ,{useContext} from "react";
import FitnessCards from "../../../components/FitnessCards";
import { FitnessItems, FitnessContext } from "../../../../Context";

const Main = () => {
  return (
    <FitnessContext>
      <FitnessItems.Consumer>
        {({ minutes, calories, workout }) => (
          <ScrollView style={{marginTop:40}}>
            <View
              style={{
                backgroundColor: "#CD853F",
                padding: 10,
                height: '100%',
                width: "100%",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
                HOME WORKOUT
              </Text>
  
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    {workout}
                  </Text>
                  <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                    WORKOUTS
                  </Text>
                </View>
  
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    {calories}
                  </Text>
                  <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                    KCAL
                  </Text>
                </View>
  
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    {minutes}
                  </Text>
                  <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
                    MINS
                  </Text>
                </View>
              </View>
  
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    width: "90%",
                    height: 120,
                    marginTop: 20,
                    borderRadius: 7,
                  }}
                  source={{
                    uri: "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",
                  }}
                />
              </View>
              <FitnessCards/>
            </View>
          </ScrollView>
        )}
      </FitnessItems.Consumer>
    </FitnessContext>
  );
};

export default Main;

const styles = StyleSheet.create({}); */
