import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDHZpDfKz711k2agTq4ekGU7-iN_p99mc",
  authDomain: "icqclone.firebaseapp.com",
  projectId: "icqclone",
  storageBucket: "icqclone.appspot.com",
  messagingSenderId: "922649039358",
  appId: "1:922649039358:web:fbdd0a0e21d64e4d32f0af",
  measurementId: "G-HHJ3S1QCQJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile,
  collection, addDoc, query, orderBy, onSnapshot,
  ref, uploadBytes, getDownloadURL
};

export async function updateUserProfile(name, file) {
  let photoURL = auth.currentUser.photoURL;

  if (file) {
    const storageRef = ref(storage, 'profiles/' + auth.currentUser.uid);
    await uploadBytes(storageRef, file);
    photoURL = await getDownloadURL(storageRef);
  }

  await updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photoURL
  });
}

window.updateUserProfile = updateUserProfile;
