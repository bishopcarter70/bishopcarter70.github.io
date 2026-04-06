                                          // VARIABLES
const searchInput = document.getElementById("PlaylistSearchField");
const Beat = document.getElementById("Beat")
const PlayPauseBtn = document.getElementById("PlayPauseBtn")
const PrevButton = document.getElementById("PrevBtn")
const NextButton = document.getElementById("NextBtn")
const ProgressBar = document.getElementById("ProgressBarFill");
const TimeDisplay = document.getElementById("TimeDisplay");
const DownloadBeatButton = document.getElementById("DownloadButton")
const AddToCartButton = document.getElementById("AddToCartButton")
const OpenPlayList = document.getElementById("PlaylistHamburger")
const BeatName = document.getElementById("BeatTitle")
const BeatGenre = document.getElementById("BeatGenre")
let currentSongIndex = 1;
let isPlaying = false;
let cart = [];

                                        //EVENT LISTENERS
searchInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  const filteredSongs = searchPlaylist(searchTerm);
  displayResults(filteredSongs);
});
PlayPauseBtn.addEventListener('click', playPause);
PrevButton.addEventListener('click', playPreviousBeat);
NextButton.addEventListener('click', playNextBeat);
Beat.addEventListener('timeupdate', () => {
    ProgressBar.value = Beat.currentTime;
    displayTime(TimeDisplay, Beat.duration, Beat.currentTime);
});
ProgressBar.addEventListener('drag', () => {
    Beat.currentTime = ProgressBarBar.value;
});
DownloadBeatButton.addEventListener('click', ShowBeatDownload);
OpenPlayList.addEventListener('click', function showPlaylist() {
    PlaylistModal.style.display = "block"; 
    displayTracksFromPlaylist();
    
});
//CloseButton.addEventListener('click', function CloseModal() {
//  LicenseModal.style.display = "none";
//  FreeBeatDownloadModal.style.display = "none";
//})


                                          // FUNCTIONS
function loadBeat(currentSongIndex) {
  Beat.src = playlist[currentSongIndex].src;
  BeatName.innerHTML = playlist[currentSongIndex].title;
  BeatGenre.innerHTML = playlist[currentSongIndex].genre;
  Beat.load();
  // You might also want to update displayed song information
}


//Playlist Controls
function playPause() {
  if (!isPlaying) {
    Beat.play();
    isPlaying = true;
    PlayPauseBtn.innerHTML = '<span> || </span>';
  } else {
    Beat.pause();
    isPlaying = false;
    PlayPauseBtn.innerHTML = '&#9654;';
  }
}


function playNextBeat() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length; // Loop back to start
  loadBeat(currentSongIndex);
  playPause();
}

function playPreviousBeat() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; // Handle negative index
  loadBeat(currentSongIndex);
  playPause();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function displayTime(element, totalDuration, currentTime) {
    element.textContent = `${formatTime(currentTime)} / ${formatTime(totalDuration)}`;
}

// Display Tracks In PlayList
const MusicInfodiv = document.getElementById("MusicInfoDiv")
function displayTracksFromPlaylist() {
  const DisplayTracks = document.getElementById("BeatsFromPlaylist");
  BeatsFromPlaylist.innerHTML = '';
 playlist.forEach((element, index)=>{
//    console.log(element, index);
    let DisplayPlaylist = document.createElement("div");
    const AddToCartBtn = document.createElement("button");
    AddToCartBtn.innerText = "ADD TO CART"
    AddToCartBtn.style.fontSize = "0.350rem"
    AddToCartBtn.style.width = "10vw"
//        MusicInfodiv.classList.add("playlist");
    DisplayPlaylist.innerHTML =`<h1 class="BeatTitle"> ${element.title}</h1>
                                 <h1 id="BeatGenre"> ${element.genre}</h1>
                                 <h1 id="BeatDuration"> ${element.duration}</h1>`; 
    DisplayPlaylist.style.display = "grid";
    DisplayPlaylist.style.gridTemplateColumns ="1fr 1fr 1fr 1fr";
    DisplayPlaylist.style.justifyContent = "center";
    DisplayPlaylist.style.fontSize = "0.3rem"; /// I NEED TO GO OVER THIS!!!!
    DisplayPlaylist.appendChild(AddToCartBtn);
    BeatsFromPlaylist.appendChild(DisplayPlaylist);
      AddToCartBtn.onclick = function() {
      LicenseModalContainer.style.display = "block";    
      LicenseModal.innerHTML = `<div id ="CloseModal" class="CloseButton" onclick= "closeModal()" style="margin-left: 60vw;" >×</div>
                                <h1 class="BeatTitle"> ${element.title}</h1>
                                <h1 id="BeatGenre"> ${element.genre}</h1>
                                <h1 id="BeatDuration"> ${element.duration}</h1>
                                <div id="LicensesInCart"> 
                                <div id="LicenseInCartContainer" style="display: flex; font-size: 0.350rem; justify-content: space-evenly; margin-top: 2.5vh;">
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> STANDARD </h1>
                                        <h1 class="LeasePrices"> $29.99</h1>
                                        <button id="MP3Lease" onclick = "AddToCart('MP3',29.99)" data-id="1" data-name="MP3Lease" data-price="29" class="AddToCart">ADD TO CART</button>
                                    </div>
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> PREMIUM </h1>
                                        <h1 class="LeasePrices"> $49.99</h1>
                                        <button id="WAVLease" onclick = "AddToCart('WAV',49.99)"  data-id="2" data-name="WAVLease" data-price="49" class="AddToCart">ADD TO CART</button>
                                    </div>
                                    <div class="DifferentLicenses">
                                        <h1 class="Licenses"> TRACKOUTS </h1>
                                        <h1 class="LeasePrices"> $99.99</h1>
                                        <button id="TrackOutLease" onclick = "AddToCart('TRACKOUTS',99.99)"  data-id="3" data-name="TrackOutLease" data-price="99" class="AddToCart">ADD TO CART</button>
                                    </div>         
                                </div>     
                                </div>`;
      };
    })
}


//Search Through Playlist
function searchPlaylist(searchTerm) {
  // Normalize the search term for case-insensitive searching
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

  if (!lowerCaseSearchTerm) {
     // Return the full playlist if the search term is empty
    return playlist;
  }

  return playlist.filter(song => {
    // Check if the search term is included in the song title or artist name
    const titleMatches = song.title.toLowerCase().includes(lowerCaseSearchTerm);
    const genreMatches = song.genre.toLowerCase().includes(lowerCaseSearchTerm);
    return titleMatches || genreMatches;
  });
}

function displayResults(results) {
  const resultsList = document.getElementById('BeatsFromPlaylist');
  const SearchPlaylistButton = document.getElementById('SearchIcon');
  SearchPlaylistButton.innerHTML = `<div>&#x2193;</div>`
  SearchPlaylistButton.style.rotate ="90deg";
  SearchPlaylistButton.style.marginLeft = "4vw";
  SearchPlaylistButton.addEventListener('click', function(){
    PlaylistModal.style.display = "none";
  });
  resultsList.innerHTML = ''; // Clear previous results
  results.forEach(beat => {
    const li = document.createElement('div');
    const AddToCartBtn = document.createElement("button");
    AddToCartBtn.innerText = "ADD TO CART"
    AddToCartBtn.style.fontSize = "0.350rem"
    AddToCartBtn.style.width = "10vw"
    li.innerHTML = `<h1 class="BeatTitle"> ${beat.title}</h1>
                    <h1 id="BeatGenre"> ${beat.genre}</h1>
                    <h1 id="BeatDuration"> ${beat.duration}</h1> 
                    `;
    resultsList.appendChild(li);
    li.appendChild(AddToCartBtn);
    li.style.display="grid";
    li.style.gridTemplateColumns ="1fr 1fr 1fr 1fr";
    li.style.justifyContent="space-between";
    li.style.fontSize = "0.3rem"; // I NEED TO GO OVER THIS!!!!
    
  });
  MusicInfodiv.style.display="none";
}



function playFromPlaylist() {
    PlaylistModal.addEventListener("click",(e) => {
        if(e.target.classList.contains("BeatTitle")) {
          //alert(e.target.innerHTML);
          const indexNum = playlist.findIndex((element, index, arr) => { 
            if (element.title === e.target.innerText) {
              return true;
            }
         });
          loadBeat(indexNum);
          Beat.play();
          PlayPauseBtn.innerHTML = '<span> || </span>'; 
          PlaylistModal.style.display = "none";
        }
      }); 
}

// THIS FUNCTION CALL ALLOWS MUSIC/BEAT TO BE PLAYED ON CLICK!
playFromPlaylist(); 

/*function displayTime(element, totalDuration, currentTime) {
    element.textContent = `${formatTime(currentTime)} / ${formatTime(totalDuration)}`;
}*/
   
function ShowBeatDownload() {
  DownloadModalContainer.style.display = "block";
  const DownloadContainer = document.createElement("div");
  DownloadContainer.innerHTML =  `
            <div id="DownloadFile" style="height: 12.5vh; width: 100vw; display: flex; justify-content: center; text-align: center; margin-top: 10vh;">
            <div id="YoutubeSubscription">
                <form action="post">
                <h1>Subscribe To My Youtube</h1>
                <button>Download Now</button>
                </form>
            </div>
            <div class="CloseButton" onclick= "closeModal()" style="left: 28vw; top: -10vh;">×</div> 
            </div>`
  DownloadModalContainer.appendChild(DownloadContainer);
}

function AddToCart(name, price){
  // Check if item already exists to increment quantity
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  console.log(cart)
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('CartItems');
  const totalDisplay = document.getElementById('CartTotal');
  // Clear current list
  cartList.innerHTML = '';
  let total = 0;

  // Render each item
  cart.forEach(item => {
    const Items = document.createElement('div');
    Items.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    cartList.appendChild(Items);
    total += item.price * item.quantity;
  });
  totalDisplay.textContent = total.toFixed(2);
}

function closeModal() {
  LicenseModalContainer.style.display = "none";
  DownloadModalContainer.style.display = "none";
  CartPopUpContainer.style.display = "none";  
}