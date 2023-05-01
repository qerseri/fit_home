import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {ROUTES, CustomInput, CustomButton} from '../../components'

const options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

export default UserParameters = () => {
    const navigation = useNavigation();

    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');

    const checkForm = () => {
        if (age && height && weight && gender) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = () => {
        if (checkForm()) {
            navigation.navigate(ROUTES.ACTIVITY_AND_GOAL, {
                gender, age, height, weight
            })
        } else {
            alert('Пожалуйста, заполните и выберите все поля');
        }
    }
    
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>

                <View style={styles.checkbox_container}>
                    {options.map((option) => (
                        <CheckBox
                            key={option.value}
                            title={option.label}
                            checked={gender === option.value}
                            onPress={() => setGender(option.value)}
                            containerStyle={{backgroundColor: '#FDF7F3'}}
                            checkedIcon={<MaterialCommunityIcons name="check-circle" size={24} color="#58754B" />}
                            uncheckedIcon={<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="#58754B" />}
                        />
                    ))}
                </View>
                
                <CustomInput 
                    placeholder='Age' 
                    value={age} 
                    setValue={text => setAge(text)}
                    keyboardtype = 'numeric'
                />
                <CustomInput 
                    placeholder='Height' 
                    value={height} 
                    setValue={text => setHeight(text)}
                    keyboardtype = 'numeric'
                />
                <CustomInput 
                    placeholder='Weight' 
                    value={weight} 
                    setValue={text => setWeight(text)}
                    keyboardtype = 'numeric'
                />

                <CustomButton text='Next' onPress={handleSubmit}/>
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
        padding: 20,
    },
    checkbox_container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
});
