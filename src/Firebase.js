import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDjUZhuw4agdBsEkIJzlq91BK1ebelANI8",
  authDomain: "linkedin-clone-4b146.firebaseapp.com",
  projectId: "linkedin-clone-4b146",
  storageBucket: "linkedin-clone-4b146.appspot.com",
  messagingSenderId: "259251409884",
  appId: "1:259251409884:web:a7090e792cabc233897519",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
