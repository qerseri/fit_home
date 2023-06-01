import React, { useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { CheckBox } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {ROUTES, CustomInput, CustomButton} from '../../components'

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

export default ActivityAndGoal = ({route}) => {
    const navigation = useNavigation();

    const {gender, age, height, weight} = route.params;

    const [activity, setActivity] = useState('');
    const [activityRatio, setActivityRatio] = useState();
    const [goal, setGoal] = useState('');
    const [goalRatio, setGoalRatio] = useState();

    const setActivityInfo = (value, value2) => {
        setActivity(value)
        setActivityRatio(value2)
    }
    const setGoalInfo = (value, value2) => {
        setGoal(value)
        setGoalRatio(value2)
    }

    const handleSubmit = () => {
        if (activity && goal && activityRatio && goalRatio) {
            navigation.navigate(ROUTES.REGISTER, {
                gender, age, height, weight, activity, goal, activityRatio, goalRatio
            })
        } else {
            alert('Пожалуйста, заполните и выберите все поля')
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.root}>
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

                <CustomButton text='Далее' onPress={handleSubmit}/>
                
            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        backgroundColor: '#FDF7F3',
    },
    container: {
        padding: 20,
        gap: 20
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: '#0F8D47'
    }
});