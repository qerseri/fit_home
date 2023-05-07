import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Modal, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

import calculateCalorie from '../../config/calculateCalorie';
import useAuth from '../../hooks/useAuth';
import {ROUTES, CustomInput, CustomButton} from '../../components';

export default Calorie = () => {
  
  const { user } = useAuth();
  const [modalWindow, setModalWindow] = useState(false)
  const [selectedValue, setSelectedValue] = useState('option1');

  const [dayCalorie, setDayCalorie] = useState(null);
  const [leftCalorie, setLeftCalorie] = useState(0);
  const [eatenCalorie, setEatenCalorie] = useState(0);

  const [food, setFood] = useState('');
  const [calorie, setCalorie] = useState('');

  useEffect(() => {
    if (user) {
      calculateCalorie(user, setDayCalorie);
    }
  }, [user]);

  if (!user) {
    return <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>;
  }

  return(
    <SafeAreaView style={styles.root}>
      <View style={styles.calorie_container}>
        <Text style={styles.text}>Ваша суточная норма:</Text>
        <Text style={styles.cal_text}>{dayCalorie}</Text>
        <Text style={styles.text}>(ккал)</Text>
      </View>

      <View style={styles.info_container}>
        <View style={styles.calorieInfo_container}>
          <Text style={styles.infoCal_text}>{eatenCalorie}</Text>
          <Text style={styles.text}>съедено</Text>
        </View>

        <View style={styles.calorieInfo_container}>
          <Text style={styles.infoCal_text}>{eatenCalorie}</Text>
          <Text style={styles.text}>осталось</Text>
        </View>
      </View>

      <View style={{marginTop: '12%'}}>
        <TouchableOpacity onPress={() => setModalWindow(true)}>
          <AntDesign name="pluscircleo" size={60} color="#008080"/>
        </TouchableOpacity>
      </View>



      <Modal visible={modalWindow} animationType='fade' transparent={true} >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 300, height: 300, backgroundColor:'#58754B', borderRadius: 10}}>

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

              <TouchableOpacity onPress={() => {}}>
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
    borderRadius: 125/2,
    width: 125,
    height: 125,

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
    color: '#000000',
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
    fontSize: 30,
    marginTop: '8%',
    color: '#0B8D76'
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    margin: '3%',
    backgroundColor: '#79906E'
  }
});

