/* import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { auth, firestore } from '../config/firebase';

export default useAuth = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async user=>{
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
  
}); */
import React, { useEffect, useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';

export default useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      if (user) {
        const userRef = doc(firestore, `users/${user.uid}`);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({ ...user, ...userData });
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });

    return unsub;
  }, []);

  return { user };
}