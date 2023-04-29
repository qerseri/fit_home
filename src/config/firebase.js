// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrdRxXp5f3hITspqrMYe50HOeU_pQT7aQ",
  authDomain: "fit-home-cb603.firebaseapp.com",
  projectId: "fit-home-cb603",
  storageBucket: "fit-home-cb603.appspot.com",
  messagingSenderId: "1070020884675",
  appId: "1:1070020884675:web:013e990f2c0e53edcaca76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth}