import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";
const form = document.querySelector("#formRegister");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewUser();
});

const addNewUser = () => {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const users = JSON.parse(localStorage.getItem("users"));
  const newUser = { username, password };
  const addUser = [...users, newUser];

  console.log(addUser);
  localStorage.setItem("users", JSON.stringify(addUser));
  Swal.fire({
    icon: "success",
    title: "Usuario registrado con excito",
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => window.location.href = "./login.html", 1500);
};
