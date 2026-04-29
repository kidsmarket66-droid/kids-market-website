// firebase.config.js — no imports, compat style
const firebaseConfig = {
  apiKey: "AIzaSyBGuxKVYpHQTMkGrg_Ip1tzS44bMua6PLw",
  authDomain: "kids-market-bd02a.firebaseapp.com",
  projectId: "kids-market-bd02a",
  storageBucket: "kids-market-bd02a.firebasestorage.app",
  messagingSenderId: "530767725633",
  appId: "1:530767725633:web:7135a7bb5e1b0f250272c0"
};

firebase.initializeApp(firebaseConfig);
window.db   = firebase.firestore();
window.auth = firebase.auth();