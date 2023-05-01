import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { CheckBox } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {ROUTES, CustomInput, CustomButton} from '../../components'

const activityOptions = [
    { label: 'Сидячий образ жизни', value: 'activity_level_1' },
    { label: 'Немного активный(легкие упражнения 1-3 дня в неделю)', value: 'activity_level_2' },
    { label: 'Умеренно активный(умеренные упражнения 3-5 дней в неделю)', value: 'activity_level_3' },
    { label: 'Очень активный(интенсивные упражнения 6-7 дней в неделю)', value: 'activity_level_4' },
    { label: 'Экстремально активный(физическая работа или интенсивный тренинг 2 раза в день)', value: 'activity_level_5' },
];
const goalOptions = [
    { label: 'Набор массы', value: 'goal_weightUp' },
    { label: 'Снижение веса', value: 'goal_weightDown' },
    { label: 'Поддержание текущего веса', value: 'goal_weightCurrent' },
];

export default ActivityAndGoal = ({route}) => {
    const navigation = useNavigation();

    const {gender, age, height, weight} = route.params;

    const [activity, setActivity] = useState('');
    const [goal, setGoal] = useState('');

    const handleSubmit = () => {
        if (activity && goal) {
            navigation.navigate(ROUTES.REGISTER, {
                gender, age, height, weight, activity, goal
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
                            onPress={() => setActivity(option.value)}
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
                            onPress={() => setGoal(option.value)}
                            containerStyle={{backgroundColor: '#FDF7F3', marginVertical: 8, padding: 0}}
                            checkedIcon={<MaterialCommunityIcons name="check-circle" size={30} color="#58754B" />}
                            uncheckedIcon={<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="#58754B" />}
                        />
                    ))}
                </View>

                <CustomButton text='Next' onPress={handleSubmit}/>
                
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
        alignItems: 'center',
        padding: 20,
        gap: 20
    },
    text: {
        textAlign: 'center'
    }
});