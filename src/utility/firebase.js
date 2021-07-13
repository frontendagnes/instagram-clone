import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARCKrLRBzN-TrUWfznNZBQpCA_yWCeYxI",
  authDomain: "social-app-bf925.firebaseapp.com",
  projectId: "social-app-bf925",
  storageBucket: "social-app-bf925.appspot.com",
  messagingSenderId: "493200492982",
  appId: "1:493200492982:web:f6bae31e74ade82f36d917",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
