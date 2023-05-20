import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Modal, TouchableOpacity} from 'react-native';

import { AntDesign, MaterialCommunityIcons , MaterialIcons, Ionicons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { collection, addDoc, updateDoc, doc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { firestore } from '../../../config/firebase';
import calculateCalorie from '../../../config/calculateCalorie';
import useAuth from '../../../hooks/useAuth';
import {ROUTES, CustomInput, CustomButton} from '../../../components';

export default Calorie = () => {
  const navigation = useNavigation();

  const { user } = useAuth();
  const [modalWindow, setModalWindow] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Завтрак');

  const [dayCalorie, setDayCalorie] = useState(null);
  const [leftCalorie, setLeftCalorie] = useState(null);
  const [eatenCalorie, setEatenCalorie] = useState(null);

  const [food, setFood] = useState('');
  const [calorie, setCalorie] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user) {
      calculateCalorie(user, setDayCalorie);
    }

    /* const today = new Date().toISOString().split('T')[0]; */
    console.log('today: ', today)
    if (currentDate !== today) {
      setEatenCalorie(0);
      setLeftCalorie(dayCalorie);
      setCurrentDate(today);
    }
  }, [user, currentDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedLeftCalorie = await AsyncStorage.getItem('leftCalorie');
        const savedEatenCalorie = await AsyncStorage.getItem('eatenCalorie');
        const savedCurrentDate = await AsyncStorage.getItem('currentDate');

        setLeftCalorie(parseInt(savedLeftCalorie) || dayCalorie);
        setEatenCalorie(parseInt(savedEatenCalorie) || 0);
        setCurrentDate(savedCurrentDate || new Date().toISOString().split('T')[0])
        
        console.log(savedLeftCalorie)
        console.log(savedEatenCalorie)
        console.log(savedCurrentDate)

      } catch (error) {
        console.log('Error fetching data from AsyncStorage:', error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!food || !calorie) {
      alert('заполните все поля')
      return;
    }
  
    try {
      const userRef = doc(firestore, 'users', user.uid);

      /* setCurrentDate(new Date().toISOString().split('T')[0]); */
      const mealType = selectedValue;
      const foodData = {
        food: food,
        calorie: calorie,
        mealType: mealType,
        timestamp: new Date().toISOString(),
      };
  
      const mealsRef = collection(userRef, 'food', currentDate, 'meals');
      await addDoc(mealsRef, foodData);

      // Обновление состояний leftCalorie и eatenCalorie
      const updatedEatenCalorie = eatenCalorie + parseInt(calorie);
      const updatedLeftCalorie = dayCalorie - updatedEatenCalorie;
  
      setFood('');
      setCalorie('');
      setModalWindow(false);
      setEatenCalorie(updatedEatenCalorie);
      setLeftCalorie(updatedLeftCalorie);

      await AsyncStorage.setItem('leftCalorie', updatedLeftCalorie.toString());
      await AsyncStorage.setItem('eatenCalorie', updatedEatenCalorie.toString());
      await AsyncStorage.setItem('currentDate', currentDate.toString());

      alert('Добавлено')
    } catch (error) {
      console.log('Error adding food:', error);
    }
  }

  if (!user) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
    );
  } 

  return(
    <SafeAreaView style={styles.root}>

      <Text style={styles.title}>{today}</Text>

      <View style={styles.calorie_container}>
        <Text style={styles.text}>Ваша суточная норма:</Text>

        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons name="food-apple" size={24} color="black" style={styles.cal_text}/>
          <Text style={styles.cal_text}>{dayCalorie}</Text>
        </View>

        <Text style={styles.text}>(ккал)</Text>
      </View>

      <View style={styles.info_container}>
        <View style={styles.calorieInfo_container}>
          <Text style={styles.infoCal_text}>{eatenCalorie}</Text>
          <Text style={styles.text}>съедено</Text>
        </View>

        <View style={styles.calorieInfo_container}>
          <Text style={styles.infoCal_text}>{leftCalorie}</Text> 
          <Text style={styles.text}>осталось</Text>
        </View>
      </View>

      <View style={styles.button_container}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.WATER_BALANCE)}>
          <Ionicons name="water" size={60} color="#009DD6" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalWindow(true)}>
          <AntDesign name="pluscircleo" size={60} color="#00CC99"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CALORIE_HISTORY)}>
          <MaterialIcons name="history" size={60} color="black" />
        </TouchableOpacity>
      </View>



      <Modal visible={modalWindow} animationType='fade' transparent={true} >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 300, height: 300, backgroundColor:'#58754B', borderRadius: 10, borderWidth: 2, borderColor: '#3D5134'}}>

            <View style={{flexDirection:'row-reverse', marginTop: 5, marginLeft: 5}}>
              <AntDesign name='close' style={{color: '#E52B50', fontSize: 40}} onPress={() => setModalWindow(false)}/>
            </View>

            <Text style={styles.title}>Adding</Text>
    
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedValue}
                itemStyle={{color: 'red', backgroundColor: 'lightgray'}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="Завтрак" value="Завтрак" />
                <Picker.Item label="Обед" value="Обед" />
                <Picker.Item label="Ужин" value="Ужин" />
                <Picker.Item label="Различные перекусы" value="Различные перекусы" />
              </Picker>
            </View>
            
            <View style={{alignItems: 'center'}}>
              <CustomInput 
                placeholder='Название еды' 
                value={food} 
                setValue={text => setFood(text)}
                type='SECONDARY'
              />
              <CustomInput 
                placeholder='Кол-во калорий' 
                value={calorie} 
                setValue={text => setCalorie(text)}
                type='SECONDARY'
                keyboardtype = 'numeric'
              />

              <TouchableOpacity onPress={handleSubmit}>
                
                <AntDesign name="checkcircleo" size={40} color="black" style={{marginTop: 10}}/>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B0D3A1',
    alignItems: 'center'
  },
  calorie_container: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#708666',
  
    width: '65%',
    padding: 20,
    marginTop: '5%',

    backgroundColor: '#8CA880',
    alignItems: 'center',
  },
  calorieInfo_container: {
    borderWidth: 3,
    borderColor: '#708666',
    borderRadius: 150/2,
    width: 150,
    height: 150,

    padding: 20,
    marginTop: '5%',

    backgroundColor: '#8CA880',
    alignItems: 'center',
  },
  info_container: {
    flexDirection: 'row',
    gap: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#627559',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#3B444A'
  },
  cal_text: {
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: '8%',
    color: '#0B8D76'
  },
  infoCal_text: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: '18%',
    color: '#0B8D76'
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    margin: '3%',
    backgroundColor: '#79906E'
  },
  button_container: {
    marginTop: '6%', 
    flexDirection: 'row', 
    gap: 40, 
    backgroundColor: '#68825D', 
    padding: 5,
    borderRadius: 10
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#93C47D'
  },
});

