// const themeButton = document.querySelector("#theme-btn");

// themeButton.addEventListener("click", () => {
//   // Toggle body's class for the theme mode and save the updated theme to local storage
//   document.body.classList.toggle("light-mode");
//   localStorage.setItem("themeColor", themeButton.innerText);
//   themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
// });

const themeButton = document.querySelector("#theme-btn");
const themes = ["light-mode", "dark-mode", "blue-mode", "green-mode"]; // Add your theme classes here
let currentThemeIndex = 0;

themeButton.addEventListener("click", () => {
  // Toggle body's class for the theme mode and save the updated theme to local storage
  document.body.classList.remove(themes[currentThemeIndex]);
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  document.body.classList.add(themes[currentThemeIndex]);
  localStorage.setItem("themeColor", themeButton.innerText);
  themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});
