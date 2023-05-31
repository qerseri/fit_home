import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';

import { CheckBox } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {ROUTES, CustomInput, CustomButton} from '../../../components';
import useAuth from '../../../config/useAuth';
import { firestore } from '../../../config/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const activityOptions = [
    { label: 'Сидячий образ жизни', value: 'Сидячий образ жизни', value2: 1.2},
    { label: 'Немного активный(легкие упражнения 1-3 дня в неделю)', value: 'Немного активный', value2: 1.375},
    { label: 'Умеренно активный(умеренные упражнения 3-5 дней в неделю)', value: 'Умеренно активный', value2: 1.55},
    { label: 'Очень активный(интенсивные упражнения 6-7 дней в неделю)', value: 'Очень активный', value2: 1.725},
    { label: 'Экстремально активный(физическая работа или интенсивный тренинг 2 раза в день)', value: 'Экстремально активный', value2: 1.9},
];
const goalOptions = [
    { label: 'Набор массы', value: 'Набор массы', value2: 1.2},
    { label: 'Снижение веса', value: 'Снижение веса', value2: 0.8},
    { label: 'Поддержание текущего веса', value: 'Поддержание текущего веса', value2: 1},
];

export default ChangeActivity = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [activity, setActivity] = useState('');
    const [activityRatio, setActivityRatio] = useState();
    const [goal, setGoal] = useState('');
    const [goalRatio, setGoalRatio] = useState();

    useEffect(() => {
      if (user) {
        setActivity(user.activity);
        setActivityRatio(user.activityRatio)
        setGoal(user.goal);
        setGoalRatio(user.goalRatio)
      }
    }, [user]);

    const setActivityInfo = (value, value2) => {
        setActivity(value)
        setActivityRatio(value2)
    }
    const setGoalInfo = (value, value2) => {
        setGoal(value)
        setGoalRatio(value2)
    }

    const handleSubmit = async () => {
      if (activity && goal && activityRatio && goalRatio) {
        try {
          setLoading(true)
          const userRef = doc(firestore, `users/${user.uid}`);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
              await updateDoc(userRef, {
                  activity: activity,
                  goal: goal,
                  activityRatio: activityRatio,
                  goalRatio: goalRatio
              });
          }
          navigation.navigate(ROUTES.ACCOUNT)
          alert("Your information has been update");
        } catch (err) {
            console.log('got error: ', err.message)
        } finally {
            setLoading(false)
        }
      } else {
        alert('заполните все поля')
      }
    };

    if (!user) {
      return (
        <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
      );
    } 

    return (
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          <View>
            <Text style={styles.text}>Выберите вашу активность</Text>
            {activityOptions.map((option) => (
              <CheckBox
                key={option.value}
                title={option.label}
                textStyle={{fontSize: 15}}
                checked={activity === option.value}
                onPress={() => setActivityInfo(option.value, option.value2)}
                containerStyle={{backgroundColor: '#FDF7F3', marginVertical: 8, padding: 0}}
                checkedIcon={<MaterialCommunityIcons name="check-circle" size={30} color="#58754B" />}
                uncheckedIcon={<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="#58754B" />}
              />
            ))}
          </View>

          <View>
            <Text style={styles.text}>Выберите вашу цель</Text>
            {goalOptions.map((option) => (
              <CheckBox
                key={option.value}
                title={option.label}
                textStyle={{fontSize: 15}}
                checked={goal === option.value}
                onPress={() => setGoalInfo(option.value, option.value2)}
                containerStyle={{backgroundColor: '#FDF7F3', marginVertical: 8, padding: 0}}
                checkedIcon={<MaterialCommunityIcons name="check-circle" size={30} color="#58754B" />}
                uncheckedIcon={<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="#58754B" />}
              />
            ))}
          </View>

            <CustomButton
              text={loading ? <ActivityIndicator size="small" color="white" /> : 'Обновить'}
              onPress={handleSubmit}
            />
            
        </View>
      </ScrollView>
        
    )
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: '#FDF7F3',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    gap: 20
  },
  text: {
    textAlign: 'center'
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#93C47D'
  },
});