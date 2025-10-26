// auth.js
console.log("✅ auth.js loaded");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCqh_N2Cx8hQDfkD1It6vhV10TbVTNImA",
  authDomain: "clinic-management-system-8c525.firebaseapp.com",
  projectId: "clinic-management-system-8c525",
  storageBucket: "clinic-management-system-8c525.firebasestorage.app",
  messagingSenderId: "330451997602",
  appId: "1:330451997602:web:bc9cfbb741fbed5935d8fb",
  measurementId: "G-XNL86F4ZRG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// ---- SIGNUP ----
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from reloading
    console.log("Signup form submitted");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // ---- SIGNUP ----
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
        window.location.href = "login.html";
      } catch (error) {
        alert("Error: " + error.message);
      }
    });
  }

  // ---- LOGIN ----
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "receptionist.html"; // replace with your dashboard
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    });
  }
});
