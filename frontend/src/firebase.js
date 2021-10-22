import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYliGVeGmdCeiLMyX5YcetdpMoMmM_1t4",
  authDomain: "otp-api-c82c1.firebaseapp.com",
  projectId: "otp-api-c82c1",
  storageBucket: "otp-api-c82c1.appspot.com",
  messagingSenderId: "362934951223",
  appId: "1:362934951223:web:79c5042854660e1ea68eb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const storage = getStorage(app);
export {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  storage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
};
