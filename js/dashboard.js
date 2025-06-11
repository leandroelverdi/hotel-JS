import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";
const nameUser = localStorage.getItem("loggedInUser");
const sideBar = document.querySelector("#sideBar");
const userName = document.querySelector("#userName");
userName.innerText = `${nameUser}`;

Swal.fire({
  title: `Bienvenido ${nameUser}`,
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
})


const cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.forEach((cartItem) => {
  const tbody = document.querySelector("#tbody");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <th scope="row">${cartItem.id}</th>
    <td>${cartItem.name}</td>
      <td>${cartItem.category}</td>
      <td>${cartItem.price}</td>
`;
  tbody.appendChild(tr);
});

const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
});
