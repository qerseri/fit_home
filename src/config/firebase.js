import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";
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
export const storage = getStorage(app);


export const createUserDocument = async (user, additionalData) => {
  if (!user) return
  
  const userRef = doc(firestore, `users/${user.uid}`);
  const snapshot = await getDoc(userRef);

  if(snapshot.exists) {
    const {email} = user;
    const {firstname} = additionalData;
    const {lastname} = additionalData;
    const {gender} = additionalData;
    const {age} = additionalData;
    const {height} = additionalData;
    const {weight} = additionalData;
    const {activity} = additionalData;
    const {goal} = additionalData;
    const {activityRatio} = additionalData;
    const {goalRatio} = additionalData;
    const isCoach = false;
    const coachQuery = null;
    const coach = null;

    try{
      await setDoc(
        userRef,
        {
          email, firstname, lastname, gender, age, height, weight, 
          activity, goal, activityRatio, goalRatio, isCoach, coachQuery, coach
        }
      )
    } catch(err) {
      console.log('got error: ', err.message)
    }
  }
}

firebase.initializeApp(firebaseConfig);
export {firebase};