const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const usersDefault = [{ username: "admin", password: "admin" }];
const users = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", () => {
  localStorage.getItem("loggedInUser") ? alreadyLoged() : login();
});

if (users.length == 0) {
  localStorage.setItem("users", JSON.stringify(usersDefault));
}

const login = () => {
  const loginForm = document.querySelector("#loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = usernameInput.value;
    let password = passwordInput.value;

    let user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", username);
      alreadyLoged();
    } else {
      alert("Nombre de usuario o contraseña incorrectos.");
    }
  });
};

const alreadyLoged = () => {
  window.location.href = "./dashboard.html";
};
