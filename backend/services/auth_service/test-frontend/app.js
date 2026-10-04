import {
  auth,
  signInWithEmailAndPassword
} from "./firebase.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

const status = document.getElementById("status");
const userBox = document.getElementById("user");
const tokenBox = document.getElementById("token");
const copyButton = document.getElementById("copyButton");

loginButton.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    status.textContent = "Please enter email and password.";
    return;
  }

  status.textContent = "Logging in...";
  userBox.textContent = "";
  tokenBox.value = "";

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const idToken = await user.getIdToken();

    status.textContent = "Login successful.";

    userBox.textContent =
      `Email: ${user.email}\n` +
      `Firebase UID: ${user.uid}`;

    tokenBox.value = idToken;

    console.log("Firebase ID Token:");
    console.log(idToken);

  } catch (error) {
    console.error(error);

    status.textContent = "Login failed.";

    userBox.textContent =
      `${error.code}\n${error.message}`;
  }
});

copyButton.addEventListener("click", async () => {
  const token = tokenBox.value;

  if (!token) {
    status.textContent = "No token available.";
    return;
  }

  await navigator.clipboard.writeText(token);

  status.textContent = "Token copied!";
});