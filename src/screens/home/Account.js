import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { auth } from '../../config/firebase';

export default Account = () => {

  const handlLogout = async() => {
    await signOut(auth)
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.footer}>
          <CustomButton text='Log out' onPress={handlLogout} type='TERTIARY'/>
        </View>
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
  footer: {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    flexDirection: 'row',
}
});
