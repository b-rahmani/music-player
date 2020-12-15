const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");

const music = document.querySelector("audio");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const playBtn = document.querySelector("#play");

// music
const songs = [
  {
    name: "jacinto-1",
    displayName: "electronic",
    artist: "behnam",
  },
  {
    name: "jacinto-2",
    displayName: "electronic",
    artist: "ramin",
  },
  {
    name: "jacinto-3",
    displayName: "electronic",
    artist: "jacinto Design",
  },
];

//check if playing
let isPlaying = false;

//play

function playSong(params) {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.title = "pause";
  music.play();
}

//pause

function pauseSong(params) {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.title = "play";
  isPlaying = false;
  music.pause();
}

//Play or Pause Event Listener

playBtn.addEventListener("click", () => {
  return isPlaying ? pauseSong() : playSong();
});

//update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;

  image.src = `img/${song.name}.jpg`;
}

//Current Song

let songIndex = 0;

//prev & next
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//on load -Select First song

loadSong(songs[songIndex]);

//update progressBar &time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // update progress bar Width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //calculate display for duration

    const durationMinute = Math.floor(duration / 60);
    let durationSecconds = Math.floor(duration % 60);
    if (durationSecconds < 10) {
      durationSecconds = `0${durationSecconds}`;
    }

    //delay switching (NaN)
    if (durationSecconds) {
      durationEl.textContent = `${durationMinute}:${durationSecconds}`;
    }
    //calculate display for currentTime

    const currentMinute = Math.floor(currentTime / 60);
    let currentSecconds = Math.floor(currentTime % 60);
    if (currentSecconds < 10) {
      currentSecconds = `0${currentSecconds}`;
    }
    currentTimeEl.textContent = `${currentMinute}:${currentSecconds}`;
  }
}

//set progress bar
function setProgressBar(e) {
  const width = e.srcElement.clientWidth;
  let xposition = e.offsetX;
  const { duration } = music;

  music.currentTime = (xposition / width) * duration;
}

//Event Listeners

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
