import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { auth } from '../../config/firebase';

export default ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const resetPassword=()=>{
    if (email != null) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Check your email");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert("Incorrect email");
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

        <CustomButton text='Send a recovery link' onPress={resetPassword}/>
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
