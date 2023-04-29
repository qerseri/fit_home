import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { auth } from '../../config/firebase';

export default Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async() => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch(err) {
        console.log('got error: ', err.message)
      }
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <CustomInput 
          placeholder='Email' 
          value={email} 
          setValue={text => setEmail(text)}
          secureTextEntry={false}
        />
        <CustomInput 
          placeholder='Password' 
          value={password} 
          setValue={text => setPassword(text)}
          secureTextEntry={true}
        />

        <CustomButton text='Sign Up' onPress={handleSubmit}/>
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
