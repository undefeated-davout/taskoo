import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export let auth: Auth;
export let db: Firestore;

export const preparedFirebase = firebase;
const app = preparedFirebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'development') {
  auth = getAuth(app);
  connectAuthEmulator(auth, 'http://localhost:9099');
  db = getFirestore(app);
  connectFirestoreEmulator(db, 'localhost', 8080);
  let functions = getFunctions(app);
  functions.region = 'asia-northeast1';
  connectFunctionsEmulator(functions, 'localhost', 5001);
} else {
  auth = getAuth(app);
  db = getFirestore(app);
}

// import { getAnalytics } from 'firebase/analytics';
// const analytics = getAnalytics(app);
