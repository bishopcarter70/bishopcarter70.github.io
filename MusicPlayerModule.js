function loadBeat(currentSongIndex) {
  Beat.src = playlist[currentSongIndex].src;
  BeatName.innerHTML = playlist[currentSongIndex].title;
  BeatGenre.innerHTML = playlist[currentSongIndex].genre;
  Beat.load();
  // You might also want to update displayed song information
}

//Playlist Controls
function playPause() {
  Beat.play();
}


function playNextBeat() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length; // Loop back to start
  loadBeat(currentSongIndex);
  PlayBeat();
}

function playPreviousBeat() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; // Handle negative index
  loadBeat(currentSongIndex);
  PlayBeat();
}


// Display Tracks In PlayList
let counter = 1;
function displayTracksFromPlaylist() {
   for (let i = 0; i < playlist.length; i++) {
        console.log(playlist[i].title);        
        let DisplayPlaylist = document.createElement("div");
        DisplayPlaylist.innerHTML =`<h1 class="BeatTitle"> ${playlist[i].title}</h1>
                                 <h1 id="BeatGenre"> ${playlist[i].genre}</h1>
                                 <h1 id="BeatDuration"> ${playlist[i].duration}</h1> 
                                 <button id= "AddToCartButton" onclick="ShowPurchaseOptions()"> ADD TO CART</button>`; 
        DisplayPlaylist.style.display = "flex";
        DisplayPlaylist.style.justifyContent = "space-evenly";
        MusicInfodiv.appendChild(DisplayPlaylist);
    }
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
  const resultsList = document.getElementById('SearchFieldResults');
  resultsList.innerHTML = ''; // Clear previous results
  results.forEach(beat => {
    const li = document.createElement('div');
    li.innerHTML = `<h1 class="BeatTitle"> ${beat.title}</h1>
                    <h1 id="BeatGenre"> ${beat.genre}</h1>
                    <h1 id="BeatDuration"> ${beat.duration}</h1> 
                    <button id= "AddToCartButton" onclick="ShowPurchaseOptions()"> ADD TO CART</button>`;
    resultsList.appendChild(li);
    li.style.display="flex";
    li.style.justifyContent="space-evenly";
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
          PlaylistModal.style.display = "none"; 
        }
      }); 
}

// THIS FUNCTION CALL ALLOWS MUSIC/BEAT TO BE PLAYED ON CLICK!
playFromPlaylist(); 