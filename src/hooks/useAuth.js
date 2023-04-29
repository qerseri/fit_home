import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { auth } from '../config/firebase';

export default useAuth = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user=>{
            if(user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
        return unsub
    }, [])

    return {user}
}

const styles = StyleSheet.create({
  
});
