// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp} from 'firebase/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0covIKtMSOvVk6sRUTaQ0se6yR-KSzoo",
  authDomain: "ranked-voting-9fd69.firebaseapp.com",
  projectId: "ranked-voting-9fd69",
  storageBucket: "ranked-voting-9fd69.appspot.com",
  messagingSenderId: "79816687579",
  appId: "1:79816687579:web:e116afb3217fb5644531fe",
  measurementId: "G-S74VDQ399G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}
