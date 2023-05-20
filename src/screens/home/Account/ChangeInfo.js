import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, ScrollView} from 'react-native';

import useAuth from '../../../hooks/useAuth';
import { firestore } from '../../../config/firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import {ROUTES, CustomInput, CustomButton,} from '../../../components';

import { useNavigation } from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';


const options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

export default ChangeInfo = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstname);
            setLastName(user.lastname);
            setAge(JSON.stringify(user.age));
            setHeight(JSON.stringify(user.height));
            setWeight(JSON.stringify(user.weight));
            setGender(user.gender);
        }
    }, [user]);

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');

    const checkInfo = () => {
        const regex = /^\d+$/

        if (firstname && lastname && age && height && weight && gender) {
            if  (regex.test(age) && regex.test(height) && regex.test(weight)) {
                return true
            } else {
                alert('Недопустимые значения')
                return false
            }
        } else {
            alert('не все заполнено')
        }
    }

    const handleSubmit = async () => {
        if (checkInfo()) {
            try {
                setLoading(true)
                const userRef = doc(firestore, `users/${user.uid}`);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    await updateDoc(userRef, {
                        firstname: firstname,
                        lastname: lastname,
                        age: parseInt(age),
                        height: parseInt(height),
                        weight: parseInt(weight),
                        gender: gender
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
            alert('не все заполнено')
        }
    }

    if (!user) {
        return (
            <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen}/>
        );
    } 

    return (
        <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <CustomInput 
                    placeholder='First Name' 
                    value={firstname} 
                    setValue={text => setFirstName(text)}
                />
                <CustomInput 
                    placeholder='Last Name' 
                    value={lastname} 
                    setValue={text => setLastName(text)}
                />
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

                <CustomButton 
                    text={loading ? <ActivityIndicator size="small" color="white" /> : 'Update'}
                    onPress={handleSubmit}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#93C47D',
    },
    container: {
        alignItems: 'center',
        padding: 20,
    },
    loadingScreen: {
        flex: 1,
        backgroundColor: '#93C47D'
    },
    checkbox_container: {
        flexDirection: 'row',
    },
    gender_icons: {
        flexDirection: 'row',
        gap: 100,
    },
});
