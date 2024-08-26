import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFs-r5pjerOzwkrolL6gR1VE2BCKLXRn8",
  authDomain: "react-netflix-clone-dac5e.firebaseapp.com",
  projectId: "react-netflix-clone-dac5e",
  storageBucket: "react-netflix-clone-dac5e.appspot.com",
  messagingSenderId: "381539920551",
  appId: "1:381539920551:web:271a184ba5bff8dfddc982",
  measurementId: "G-1MCT7WMTPC",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
