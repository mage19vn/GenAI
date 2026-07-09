import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQ-4PJqWSAL18AzML7ezwN1JVZTDVi0qw",
  authDomain: "genai-2ac57.firebaseapp.com",
  databaseURL: "https://genai-2ac57-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "genai-2ac57",
  storageBucket: "genai-2ac57.firebasestorage.app",
  messagingSenderId: "792173086050",
  appId: "1:792173086050:web:7abdc84ee5983a15a4d83b",
  measurementId: "G-F2BE5M9PHT"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
