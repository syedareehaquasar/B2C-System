// import firebase from "firebase/app"
// import "firebase/auth"

// var firebaseConfig = {
//     apiKey: "AIzaSyDNqqobJwI9G-5KOn-ZRFvGtSUcCm7Q6Fg",
//     authDomain: "jeswin-671ef.firebaseapp.com",
//     projectId: "jeswin-671ef",
//     storageBucket: "jeswin-671ef.appspot.com",
//     messagingSenderId: "821944775529",
//     appId: "1:821944775529:web:9ebf1568a9823d154583f8",
//     measurementId: "G-6RZ2ZBS21S"
//   };
//   // Initialize Firebase

// const firebaseApp =  firebase.initializeApp(firebaseConfig);
// export const auth = firebaseApp.auth();
// export default firebaseApp;
// //   firebase.analytics();

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getStorage } from "firebase/storage";
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
export { auth, RecaptchaVerifier, signInWithPhoneNumber, storage };
