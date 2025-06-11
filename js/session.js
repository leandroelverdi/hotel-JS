const loginButton = document.querySelector("#loginButton")
const userLoged = document.querySelector("#userLoged");

const isLoged = () => {
  if (localStorage.getItem("loggedInUser") !== null) {
    userLoged.classList.replace("d-none", "d-flex");
    loginButton.classList.replace("d-flex", "d-none");
  }
}
isLoged();
