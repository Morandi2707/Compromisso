// Crie o arquivo src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyASpsGeogr3kc4Ynr-UhHUbWVT9ZpoGOzQ",
    authDomain: "compromisso-105d4.firebaseapp.com",
    projectId: "compromisso-105d4",
    storageBucket: "compromisso-105d4.appspot.com", // Corrigido aqui
    messagingSenderId: "288624322555",
    appId: "1:288624322555:web:695ce7706b22adb9e0cd5e",
    measurementId: "G-8BHJ09M6S1" // Esse é o valor correto para o measurementId
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, setDoc, getDocs, deleteDoc, onSnapshot, QuerySnapshot, DocumentData };