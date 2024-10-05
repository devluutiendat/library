// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaSZRskCVz6xg71SFoRRYtsAPuogCIyT8",
  authDomain: "book-46b5a.firebaseapp.com",
  projectId: "book-46b5a",
  storageBucket: "book-46b5a.appspot.com",
  messagingSenderId: "1047993828704",
  appId: "1:1047993828704:web:f0636591f506299dfdca05",
  measurementId: "G-WWPKLK1JEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);