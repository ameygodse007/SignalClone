// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7WyJ0bv7r5olXOC406JWX03FFgRve9Ug",
  authDomain: "signal-81e6e.firebaseapp.com",
  projectId: "signal-81e6e",
  storageBucket: "signal-81e6e.appspot.com",
  messagingSenderId: "412401580203",
  appId: "1:412401580203:web:7ec84dd93de414efe65fee",
  measurementId: "G-10N34436VT",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
