import {firebase} from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAc9JyQtC0NzQlJmvwUaZor_E5eGllEDW4",

  authDomain: "portfolioapp-49fe5.firebaseapp.com",

  projectId: "portfolioapp-49fe5",

  storageBucket: "portfolioapp-49fe5.appspot.com",

  messagingSenderId: "816192584949",

  appId: "1:816192584949:web:3ec3710cb499ffc42a59bc",

  measurementId: "G-TP6S4S3QX9"

    });
  
  
  const db = firebase.firestore();

  
  export {db};