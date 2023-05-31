import React, { useEffect, useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from './firebase';

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