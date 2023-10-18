const closeAdminPopupButton = document.querySelector("#close-admin-popup");
const adminPopup = document.querySelector("#admin-popup");

closeAdminPopupButton.addEventListener("click", () => {
  adminPopup.style.display = "none";
  isAdminEnteringPassword = false; // Reset the password entry flag
  enteredPassword = ''; // Reset the entered password
});
