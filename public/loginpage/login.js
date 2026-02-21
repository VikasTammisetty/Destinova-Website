import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const form = document.getElementById("login-form");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
