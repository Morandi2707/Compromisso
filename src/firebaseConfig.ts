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
  projectId: "compromisso-105d4.firebasestorage.app",
  storageBucket: "288624322555",
  messagingSenderId: "1:288624322555:web:695ce7706b22adb9e0cd5e",
  appId: "G-8BHJ09M6S1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, setDoc, getDocs, deleteDoc, onSnapshot, QuerySnapshot, DocumentData };