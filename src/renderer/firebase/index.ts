import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQfkAb8pXjsr_o25OthP3Nch7LqpHL-s8",
  authDomain: "launchasaur-development.firebaseapp.com",
  projectId: "launchasaur-development",
  storageBucket: "launchasaur-development.appspot.com",
  messagingSenderId: "962659759134",
  appId: "1:962659759134:web:bf79d2a1ce97a786ba6a0f",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
