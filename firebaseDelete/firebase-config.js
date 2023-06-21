// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAlrJ9Zii3zSB8Gjn48718ki5SM-jFIvu4',
    authDomain: 'emerit-6d02d.firebaseapp.com',
    projectId: 'emerit-6d02d',
    storageBucket: 'emerit-6d02d.appspot.com',
    messagingSenderId: '142707999373',
    appId: '1:142707999373:web:afa20e55c4a8c0755558c4',
    measurementId: 'G-W3JP4ZT08M'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
