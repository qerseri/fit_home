import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
    ScrollView,
  } from "react-native";
  import React ,{useContext} from "react";

  import { useNavigation, useRoute } from "@react-navigation/native";
  import { Ionicons, AntDesign } from "@expo/vector-icons";
  import { FitnessItems} from "../../../../Context";

  import {ROUTES, CustomInput, CustomButton} from '../../../components'

  const WorkOutScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const {
      completed,
      setCompleted,
    } = useContext(FitnessItems);
    
    const handleSubmit = () => {
      navigation.navigate(ROUTES.FIT_SCREEN, {
        excersises:route.params.excersises,
      })
      setCompleted([]);
    }

    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
          
          <Image style={{ width: "100%", height: 170 }} source={{ uri: route.params.image }}/>
  
          {route.params.excersises.map((item, index) => (
            <Pressable
              style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
              key={index}
            >
              <Image
                style={{ width: 90, height: 90 }}
                source={{ uri: item.image }}
              />
  
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", width:170, }}>
                  {item.name}
                </Text>
  
                <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                  x{item.sets}
                </Text>
              </View>
  
              {completed.includes(item.name) ? (
                <AntDesign style={{marginLeft:40}} name="checkcircle" size={24} color="green" />
              ) : (
                null
              )}
            </Pressable>
          ))}
        </ScrollView>
        

        <View style={styles.container}>
          <CustomButton text='START' onPress={handleSubmit}/>
        </View>
      </>
    );
  };
  
  export default WorkOutScreen;
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#B0D3A1'
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#B0D3A1',
      padding: 10
    },
  });
