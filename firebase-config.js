// firebase-config.js - Centralized Professional Backend Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDk359LPnFT_Jh7i6LdL35rS5Gd7inuHc",
  authDomain: "adonwheels-be097.firebaseapp.com",
  projectId: "adonwheels-be097",
  storageBucket: "adonwheels-be097.firebasestorage.app",
  messagingSenderId: "90516470834",
  appId: "1:90516470834:web:2e8171d4ad7db539d4d02b",
  measurementId: "G-6XQL5855HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export db to be used in other files (Admin, Marketplace, etc.)
export const db = getFirestore(app);
