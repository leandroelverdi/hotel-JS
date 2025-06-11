import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";
import { getItems } from "./fetch.js";
let arrayCart = JSON.parse(localStorage.getItem("cart")) || [];
const app = document.querySelector("#app");
let arrayItems = [];
let count = 0;

document.addEventListener("DOMContentLoaded", () => {
  getItems()
    .then((items) => {
      arrayItems = items;
      showItems(arrayItems);
    })
    .catch((err) =>
      console.log(err, "Error al obtener los datos de la base de datos")
    );
});

const showItems = (arrayItems) => {
  arrayItems.forEach((item) => {
    if (count < 6) {
      const card = document.createElement("div");
      card.classList.add("card", "col", "p-0");
      card.innerHTML = `
          <img src="images/${item.url}" class="card-img-top booking-img" alt="Item" />
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="h-100 d-flex flex-column justify-content-start">
              <h2 class="card-title fs-5">${item.name}</h2>
              <p class="card-text">$${item.price}</p>
            </div>
            <a href="#" id="${item.id}" class="btn btn-primary btnAdd w-100">Reservar</a>
          </div>
          `;
      count++;
      app.appendChild(card);
    }
  });

  const btnAdd = document.querySelectorAll(".btnAdd");

  btnAdd.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const { target } = e;
      const { id } = target;
      if (localStorage.getItem("loggedInUser") !== null) {
        const item = arrayItems.find((item) => item.id == id);
        Swal.fire({
          icon: "success",
          title: "Su reserva se agrego con exito",
          showConfirmButton: false,
          timer: 1500,
        });
        arrayCart.push(item);
        localStorage.setItem("cart", JSON.stringify(arrayCart));
      } else {
        Swal.fire({
          title: "Inicia sesion para continuar",
          confirmButtonText: "Entendido",
        });
      }
    });
  });
};
