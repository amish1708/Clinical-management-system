// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCCqh_N2Cx8hQDfkD1It6vhV10TbVTNImA",
  authDomain: "clinic-management-system-8c525.firebaseapp.com",
  projectId: "clinic-management-system-8c525",
  storageBucket: "clinic-management-system-8c525.appspot.com", // ✅ Correct storageBucket domain!
  messagingSenderId: "330451997602",
  appId: "1:330451997602:web:bc9cfbb741fbed5935d8fb",
  measurementId: "G-XNL86F4ZRG",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ This line was missing!
const analytics = getAnalytics(app); // Optional, if you want analytics

// ✅ Export them
export { db, auth };
