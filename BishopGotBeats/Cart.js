const CartIcon = document.getElementById("Cart");
const CartInformation = document.getElementById("CartInformation");
const CloseCart = document.getElementById("CloseModal")
// EVENT LISTENERS
CartIcon.addEventListener('click', function showCart(){
  CartPopUpContainer.style.display = "block";
});
CloseCart.addEventListener('click', function closeCart(){
  CartPopUpContainer.style.display = "none";
});
//const OpenPlayList = document.getElementById("PlaylistHamburger")





// function checkOutPage() {
//  const CheckOutPage = document.createElement("div");
//  CheckOutPage.innerHTML = `<div style= "background-color: white"></div>`
//  CheckOutPage.style.length = "25vh";
//  CheckOutPage.style.width = "25vh";
