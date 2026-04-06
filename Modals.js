const body = document.getElementById("body");  
const NewsLetterContainer = document.getElementById("NewsLetterContainer");
const LicenseReadMoreButton = document.getElementById("LicenseReadMoreButton");

NewsLetterContainer.addEventListener('click', function(){
    NewsLetterContainer.style.display = "none";
})
window.addEventListener('load', function() {
    const NewsLetterContainer = document.getElementById("NewsLetterContainer");
    const NewsLetterModal = document.createElement("div");
    NewsLetterModal.innerHTML = `<div id ="CloseModal" class="CloseButton" style="left: 10vh; margin-bottom: -2vh;" >×</div> 
                                    <h1> SignUp For The Newsletter </h1>
                                    <label for="Name"> Name</label>
                                    <br>
                                    <input type="text" name="Name" placeholder="Name">
                                    <br>
                                    <label for="Email"> Email</label>
                                    <br>
                                    <input type="text" name="Name" placeholder="Enter Your Email">
                                    <br>
                                    <button type="submit" name="Name"> Submit </button>
                                    </div>    
                                 `
    NewsLetterContainer.appendChild(NewsLetterModal);
    NewsLetterModal.style.backgroundColor = "white";
    NewsLetterModal.style.textAlign = "center"
    NewsLetterModal.style.width = "50vw"
    NewsLetterModal.style.margin = "auto"
    NewsLetterModal.style.zIndex = "2"
    NewsLetterModal.style.marginTop = "40vh"
});

// THIS IS THE SLIDES EFFECT ON THE LICENSE MODALS
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let LicenseSlides = document.getElementsByClassName("LicensesWPic");
  if (n > LicenseSlides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = LicenseSlides.length}
  for (i = 0; i < LicenseSlides.length; i++) {
    LicenseSlides[i].style.display = "none";
  }
  LicenseSlides[slideIndex-1].style.display = "flex";
} 