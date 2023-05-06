import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { auth, createUserDocument } from '../../config/firebase';
import {ROUTES, CustomInput, CustomButton} from '../../components'

export default Register = ({route}) => {
  
  const {gender, age, height, weight, activity, goal, activityRatio, goalRatio} = route.params;

  const [loading, setLoading] = useState(false);

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async() => {
    if (email && password && username && confirmPassword == password) {
      try {
        setLoading(true)
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        await createUserDocument(user, {
          username, 
          gender, 
          age: parseInt(age), 
          height: parseInt(height), 
          weight: parseInt(weight), 
          activity,
          goal,
          activityRatio,
          goalRatio,
        })
      } catch(err) {
        console.log('got error: ', err.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <CustomInput 
          placeholder='Username' 
          value={username} 
          setValue={text => setUserName(text)}
        />
        <CustomInput 
          placeholder='Email' 
          value={email} 
          setValue={text => setEmail(text)}
        />
        <CustomInput 
          placeholder='Password' 
          value={password} 
          setValue={text => setPassword(text)}
          secureTextEntry={true}
        />
        <CustomInput 
          placeholder='Confirm Password' 
          value={confirmPassword} 
          setValue={text => setConfirmPassword(text)}
          secureTextEntry={true}
        />

        <CustomButton 
          text={loading ? <ActivityIndicator size="small" color="white" /> : 'Sign Up'} 
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
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
});
