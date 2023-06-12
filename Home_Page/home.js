// Import necessary Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"

// Wait for the DOM to be loaded
const avatarIcon = document.getElementById('avatar_icon');
const sidebar = document.getElementById('sidebar');
const sideCloseIcon = document.getElementById('active_close_icon');

avatarIcon.addEventListener('click', function () {
  sidebar.classList.toggle('open');
});

sideCloseIcon.addEventListener('click', function () {
  sidebar.classList.toggle('close');
});

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-I2XzUS9XfxbM4UNdqPDVJl2yWs5R47c",
  authDomain: "fir-auth-gurmentmeal.firebaseapp.com",
  databaseURL: "https://fir-auth-gurmentmeal-default-rtdb.firebaseio.com",
  projectId: "fir-auth-gurmentmeal",
  storageBucket: "fir-auth-gurmentmeal.appspot.com",
  messagingSenderId: "29585614956",
  appId: "1:29585614956:web:2ee168e1e24507aa339049"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// Check if the user is logged in or logged out
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    const uid = user.uid;
    window.location.href = "/Home_Page/home.html"
    // ...
  } else {
    // User is logged out
    window.location.href = "/Login_Pages/login.html"
  }
});



const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    //user sign in docs list avaliable properties
    const uid = user.uid;
    // if logged in
    window.location.href = "/Home_Page/home.html"


  } else {

    //if logged out
    window.location.href = "/Login_Pages/login.html"

  }
})

// Handle sign-out functionality
const logout = document.getElementById('signout-btn');
logout.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful
      alert('Signed out');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});


