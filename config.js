// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSvA77d8GoDZcqbk o7Cscund4C_lMf zI",
  authDomain: "allamtechnopro.firebaseapp.com",
  projectId: "allamtechnopro",
  storageBucket: "allamtechnopro.appspot.com",
  messagingSenderId: "880765694402",
  appId: "1:880765694402:web:88a5db645e555e742d665b",
  measurementId: "G-WS1EJL22P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
