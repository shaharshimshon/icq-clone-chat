import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "./firebase.js";

const auth = window.firebaseApp.auth;
const db = window.firebaseApp.db;

const authContainer = document.getElementById("auth-container");
const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");

// Auth handlers
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};

window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert("Register failed: " + err.message);
  }
};

window.logout = async function () {
  await signOut(auth);
};

// Realtime chat listener
function setupChatListener() {
  const q = query(collection(db, "messages"), orderBy("createdAt"));
  onSnapshot(q, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.textContent = `${msg.email}: ${msg.text}`;
      messagesDiv.appendChild(div);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

// Send message
window.sendMessage = async function () {
  const text = messageInput.value.trim();
  if (!text) return;

  await addDoc(collection(db, "messages"), {
    text,
    email: auth.currentUser.email,
    createdAt: serverTimestamp()
  });

  messageInput.value = "";
};

// Watch auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    authContainer.classList.add("hidden");
    chatContainer.classList.remove("hidden");
    setupChatListener();
  } else {
    authContainer.classList.remove("hidden");
    chatContainer.classList.add("hidden");
  }
});