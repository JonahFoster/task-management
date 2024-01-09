// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDMAUEmedVQ0YNdeySQILO9H-AAKZ8iOI",
    authDomain: "task-manager-448ed.firebaseapp.com",
    projectId: "task-manager-448ed",
    storageBucket: "task-manager-448ed.appspot.com",
    messagingSenderId: "95795147103",
    appId: "1:95795147103:web:7bdb5b2efbd58a6e4cc6ea",
    measurementId: "G-SJF98S2MNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db }