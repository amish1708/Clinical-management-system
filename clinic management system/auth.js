// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCqh_N2Cx8hQDfkD1It6vhV10TbVTNImA",
  authDomain: "clinic-management-system-8c525.firebaseapp.com",
  projectId: "clinic-management-system-8c525",
  storageBucket: "clinic-management-system-8c525.firebasestorage.app",
  messagingSenderId: "330451997602",
  appId: "1:330451997602:web:bc9cfbb741fbed5935d8fb",
  measurementId: "G-XNL86F4ZRG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
