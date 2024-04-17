// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp} from 'firebase/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase/firestore';
import 'dotenv/config'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}
