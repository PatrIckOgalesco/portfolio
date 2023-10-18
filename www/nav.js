document.addEventListener("DOMContentLoaded", function () {
  const navBtn = document.getElementById("nav-btn");
  const sidebar = document.querySelector(".sidebar");

  navBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
  });
});
