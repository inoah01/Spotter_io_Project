// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB38B3uGlbBz9HOGPHM_rjx8Xw306Yl37g",
  authDomain: "spotter-io.firebaseapp.com",
  projectId: "spotter-io",
  storageBucket: "spotter-io.appspot.com",
  messagingSenderId: "766076555902",
  appId: "1:766076555902:web:a22c532d497734a872fe2f",
  measurementId: "G-ZRM471BSX4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = analytics.isSupported(getAnalytics(app));

export default app;
