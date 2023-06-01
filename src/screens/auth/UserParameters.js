import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {ROUTES, CustomInput, CustomButton} from '../../components'

const options = [
    { label: 'Мужчина', value: 'Male' },
    { label: 'Женщина', value: 'Female' },
];

export default UserParameters = () => {
    const navigation = useNavigation();
    const [ageError, setAgeError] = useState();
    const [heightError, setHeightError] = useState();
    const [weightError, setWeightError] = useState();

    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');

    const checkInfo = () => {

        const regex = /^\d+$/

        if (age && height && weight && gender) {
            if (regex.test(age) && regex.test(height) && regex.test(weight)) {
                return true
            } else {
                alert('Недопустимые значения')
                return false
            }
        } else {
            alert('не все заполнено')
        }
    }

    const handleSubmit = () => {
        if (checkInfo()) {
            navigation.navigate(ROUTES.ACTIVITY_AND_GOAL, {
                gender, age, height, weight
            })
        }
    }
    
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>

                <View style={styles.gender_icons}>
                    <Foundation name="male-symbol" size={45} color="#3FCBFF"/>
                    <Foundation name="female-symbol" size={45} color="#F85376"/>
                </View>

                <View style={styles.checkbox_container}>
                    {options.map((option) => (
                        <CheckBox
                            key={option.value}
                            title={option.label}
                            checked={gender === option.value}
                            onPress={() => setGender(option.value)}
                            containerStyle={{backgroundColor: '#FDF7F3', borderRadius: 10,}}
                            checkedIcon={<MaterialCommunityIcons name="check-circle" size={24} color="#58754B" />}
                            uncheckedIcon={<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="#58754B" />}
                        />
                    ))}
                </View>
                
                <CustomInput 
                    placeholder='Возраст' 
                    value={age} 
                    setValue={text => setAge(text)}
                    keyboardtype = 'numeric'
                />
                <Text style={(ageError) ? styles.errorText : {display: 'none'}}>{ageError}</Text>

                <CustomInput 
                    placeholder='Рост (в см)' 
                    value={height} 
                    setValue={text => setHeight(text)}
                    keyboardtype = 'numeric'
                />
                <Text style={(heightError) ? styles.errorText : {display: 'none'}}>{heightError}</Text>

                <CustomInput 
                    placeholder='Вес (в кг)' 
                    value={weight} 
                    setValue={text => setWeight(text)}
                    keyboardtype = 'numeric'
                />
                <Text style={(weightError) ? styles.errorText : {display: 'none'}}>{weightError}</Text>

                <CustomButton text='Далее' onPress={handleSubmit}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        backgroundColor: '#FDF7F3',
    },
    container: {
        alignItems: 'center',
        padding: 30,
    },
    checkbox_container: {
        flexDirection: 'row',
    },
    gender_icons: {
        flexDirection: 'row',
        gap: 100,
    },
    errorText: {
        color:'#F85376'
    },
});
