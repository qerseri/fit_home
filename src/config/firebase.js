import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe24MAg7yOkvfPEZK9Gfg9dlZSi2XTbyw",
  authDomain: "adminfit.firebaseapp.com",
  databaseURL: "https://adminfit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "adminfit",
  storageBucket: "adminfit.appspot.com",
  messagingSenderId: "923441335220",
  appId: "1:923441335220:web:bd7133922fdde9041080e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);


export const createUserDocument = async (user, additionalData) => {
  if (!user) return

  // Получение ссылки на документ пользователя
  const userRef = doc(firestore, `users/${user.uid}`);

  // Проверка наличия документа пользователя в Firestore
  const snapshot = await getDoc(userRef);

  if(snapshot.exists) {
    const {email} = user;
    const {username} = additionalData;
    const {gender} = additionalData;
    const {age} = additionalData;
    const {height} = additionalData;
    const {weight} = additionalData;
    const {activity} = additionalData;
    const {goal} = additionalData;
    const {activityRatio} = additionalData;
    const {goalRatio} = additionalData;
    const isCoach = false;
    try{
      // Создание документа пользователя
      await setDoc(
        userRef,
        {
          email, username, gender, age, height, weight, 
          activity, goal, activityRatio, goalRatio, isCoach
        }
      )
      console.log('succes adding datas')
    } catch(err) {
      console.log('got error: ', err.message)
    }
  }
}

firebase.initializeApp(firebaseConfig);

export {firebase};