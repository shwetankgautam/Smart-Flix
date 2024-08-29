// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmirfFYXaKf7-xti8-MU21yp3PPB3cSNE",
  authDomain: "netflixgpt-bb6ca.firebaseapp.com",
  projectId: "netflixgpt-bb6ca",
  storageBucket: "netflixgpt-bb6ca.appspot.com",
  messagingSenderId: "120101475860",
  appId: "1:120101475860:web:210d44088783a3fd15b901",
  measurementId: "G-VXLMFRMB99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
export const auth = getAuth();