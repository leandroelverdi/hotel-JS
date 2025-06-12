const btn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", function () {
    btn.style.display = window.scrollY > 200 ? "flex" : "none";
});
btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});