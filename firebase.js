import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-storage.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBDHZpDfKz711k2agTq4ekGU7-iN_p99mc",
  authDomain: "icqclone.firebaseapp.com",
  projectId: "icqclone",
  storageBucket: "icqclone.appspot.com",
  messagingSenderId: "922649039358",
  appId: "1:922649039358:web:fbdd0a0e21d64e4d32f0af",
  measurementId: "G-HHJ3S1QCQJ"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Profile updater
async function updateUserProfile(name, file) {
  let photoURL = auth.currentUser.photoURL;

  try {
    if (file) {
      const storageRef = ref(storage, 'profiles/' + auth.currentUser.uid + '/profile.jpg');
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });

    console.log("Profile updated:", { name, photoURL });
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
}

// Exports
export {
  auth,
  db,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  ref,
  uploadBytes,
  getDownloadURL,
  updateUserProfile
};
