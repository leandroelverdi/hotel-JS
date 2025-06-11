const btn = document.getElementById("scrollToTopBtn");

// Mostrar el botón cuando se hace scroll hacia abajo
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.style.display = "flex";
    } else {
        btn.style.display = "none";
    }
};

// Scroll suave hacia arriba al hacer clic
btn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};