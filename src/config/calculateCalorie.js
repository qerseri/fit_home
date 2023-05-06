import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import useAuth from '../hooks/useAuth';

export default calculateCalorie = () => {
    const { user } = useAuth();

    /* const [age, setAge] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [activityRatio, setActivityRatio] = useState();
    const [goalRatio, setGoalRatio] = useState(); */
    
    const Harris_Benedict_formula = () => {
        switch (user.gender) {
            case 'Male':
                let maleCalorie = (88.36 + (13.4 * user.weight) + (4.8 * user.height) - (5.7 * user.age)) * user.activityRatio * user.goalRatio
                setDayCalorie(maleCalorie)
                break
            case 'Female':
                let femaleCalorie = (447.6 + (9.2 * user.weight) + (3.1 * user.height) - (4.3 * user.age)) * user.activityRatio * user.goalRatio
                setDayCalorie(femaleCalorie)
                break
            default:
                console.log('error')
                break
        }
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>

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
});
