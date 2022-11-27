import {
    FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID,
    FIREBASE_APPID,
    FIREBASE_MEASUREMENTID
} from '@env';
import { initializeApp } from 'firebase/app';	
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// API Details - https://firebase.google.com/docs/web/setup
const firebaseConfig = {
    apiKey: FIREBASE_APIKEY,
    authDomain: FIREBASE_AUTHDOMAIN,
    projectId: FIREBASE_PROJECTID,
    storageBucket: FIREBASE_STORAGEBUCKET,
    messagingSenderId: FIREBASE_MESSAGINGSENDERID,
    appId: FIREBASE_APPID,
    measurementId: FIREBASE_MEASUREMENTID
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);

export const login = async (email: string, password: string) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password
    );
    return userCredential.user;
};

export const register = async (email: string, password: string) => {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const logout = async () => {
const auth = getAuth();
await signOut(auth);
};

