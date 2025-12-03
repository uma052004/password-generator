const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const passwordDisplay = document.getElementById("passwordDisplay");
const copyBtn = document.getElementById("copyBtn");
const toggleEye = document.getElementById("toggleEye");
const generateBtn = document.getElementById("generateBtn");
const strengthStatus = document.getElementById("strengthStatus");
const copyMsg = document.getElementById("copyMsg");
const historyList = document.getElementById("historyList");

let passwordHistory = [];

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*(){}[]<>?/|~";

lengthSlider.oninput = () => lengthValue.textContent = lengthSlider.value;

// Generate password
generateBtn.addEventListener("click", () => {
  let characters = "";
  if (document.getElementById("lowercase").checked) characters += lowercase;
  if (document.getElementById("uppercase").checked) characters += uppercase;
  if (document.getElementById("numbers").checked) characters += numbers;
  if (document.getElementById("symbols").checked) characters += symbols;

  if (characters.length === 0) return;

  let password = "";
  for (let i = 0; i < lengthSlider.value; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  passwordDisplay.value = password;
  checkStrength(password);
  saveToHistory(password);
});

// Copy feature
copyBtn.addEventListener("click", () => {
  if (!passwordDisplay.value) return;

  navigator.clipboard.writeText(passwordDisplay.value);
  copyMsg.textContent = "Copied ✔";
  setTimeout(() => (copyMsg.textContent = ""), 1500);
});

// Eye icon toggle (Show/Hide)
toggleEye.addEventListener("click", () => {
  passwordDisplay.type = passwordDisplay.type === "text" ? "password" : "text";
});

// Password strength
function checkStrength(pass) {
  let score = 0;
  if (pass.length >= 12) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  if (score <= 1) {
    strengthStatus.textContent = "Strength: Weak ❌";
    strengthStatus.style.color = "red";
  } else if (score == 2) {
    strengthStatus.textContent = "Strength: Medium ⚠️";
    strengthStatus.style.color = "yellow";
  } else {
    strengthStatus.textContent = "Strength: Strong ✅";
    strengthStatus.style.color = "lightgreen";
  }
}

// Save in history
function saveToHistory(password) {
  passwordHistory.unshift(password);
  if (passwordHistory.length > 10) passwordHistory.pop();
  renderHistory();
}

// Show history list
function renderHistory() {
  historyList.innerHTML = "";
  passwordHistory.forEach(pass => {
    const li = document.createElement("li");
    li.textContent = pass;
    li.onclick = () => {
      navigator.clipboard.writeText(pass);
      copyMsg.textContent = "Copied from History ✔";
      setTimeout(() => (copyMsg.textContent = ""), 1500);
    };
    historyList.appendChild(li);
  });
}

