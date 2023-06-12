import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyC-I2XzUS9XfxbM4UNdqPDVJl2yWs5R47c",
  authDomain: "fir-auth-gurmentmeal.firebaseapp.com",
  databaseURL: "https://fir-auth-gurmentmeal-default-rtdb.firebaseio.com",
  projectId: "fir-auth-gurmentmeal",
  storageBucket: "fir-auth-gurmentmeal.appspot.com",
  messagingSenderId: "29585614956",
  appId: "1:29585614956:web:2ee168e1e24507aa339049"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const signUpButton = document.getElementById('register-btn');

signUpButton.addEventListener('click', () => {
  const email = document.getElementById('email_input').value;
  const password = document.getElementById('pass_input').value;
  const username = document.getElementById('name_input').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set to Realtime Database
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email
      });

      alert('User created');
      alert('Redirecting');

      window.location.href = "/Login_Pages/login.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});

const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', () => {
  const email = document.getElementById('login_email_input').value;
  const password = document.getElementById('login_password_input').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Update Realtime Database
      const dt = new Date();

      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      });

      alert('User logged in');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });


  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //user sign in docs list avaliable properties
      const uid = user.uid;
      // if logged in
      

    } else {

      //if logged out
      window.location.href = "/Login_Pages/login.html"

    }
  })

  const logout = document.getElementById('logout-btn')

  logout.addEventListener('click', () => {
    signOut(auth).then(() => {
      //signout success
      alert('signed out')
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    })
  })






});
