import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";
import { getItems } from "./fetch.js";
const contianer = document.getElementById("container-lodging");
const btnFilter = document.getElementById("btn-filter");
const btnReset = document.getElementById("btn-reset");
const minPrice = document.getElementById("price-min");
const maxPrice = document.getElementById("price-max");
const category = document.getElementById("category");
let arrayCart = JSON.parse(localStorage.getItem("cart")) || [];
let arrayItems = [];

const showItems = (items) => {
  contianer.innerHTML = "";

  if (items.length === 0) {
    contianer.innerHTML = `
      <div class="alert alert-warning d-flex justify-content-center" role="alert">
        No hay resultados que apliquen a tu filtro
      </div>`;
    return;
  }

  const fragment = new DocumentFragment();

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", "col", "p-0");
    card.innerHTML = `
        <img src="../images/${item.url}" class="card-img-top booking-img" alt="Item" />
        <div class="card-body d-flex flex-column justify-content-between gap-5">
          <div class="h-100 d-flex flex-column justify-content-start">
            <h2 class="card-title fs-5">${item.name}</h2>
            <p class="card-text">$${item.price}</p>
          </div>
          <a href="#" id="${item.id}" class="btn btn-primary btnAdd w-100">Reservar</a>
        </div>
        `;
    fragment.appendChild(card);
  });

  contianer.append(fragment);

  const btnAdd = document.querySelectorAll(".btnAdd");

  btnAdd.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const { target } = e;
      const { id } = target;
      if (localStorage.getItem("loggedInUser") !== null) {
        const item = items.find((item) => item.id == id);
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

const filterItems = () => {
  getItems()
    .then((items) => {
      let filteredItems = [...items];
      let minPriceParsed = parseInt(minPrice.value);
      let maxPriceParsed = parseInt(maxPrice.value);

      if (!isNaN(minPriceParsed)) {
        filteredItems = filteredItems.filter(
          (item) => item.price >= minPriceParsed
        );
      }

      if (!isNaN(maxPriceParsed)) {
        filteredItems = filteredItems.filter(
          (item) => item.price <= maxPriceParsed
        );
      }

      if (category.value) {
        filteredItems = items.filter((item) => item.category == category.value);
      }

      showItems(filteredItems);
    })
    .catch((err) => err, "Error al filtrar los items");
};

const resetFilters = () => {
  document.getElementById("price-min").value = "";
  document.getElementById("price-max").value = "";
  document.getElementById("category").value = "";

  showItems(arrayItems);
};

document.addEventListener("DOMContentLoaded", () => {
  getItems()
    .then((items) => {
      arrayItems = items;
      showItems(items);
    })
    .catch((err) =>
      console.log(err, "Error al obtener los datos de la base de datos")
    );
});

btnFilter.addEventListener("click", filterItems);
btnReset.addEventListener("click", resetFilters);
