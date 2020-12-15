const music = document.querySelector("audio");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const playBtn = document.querySelector("#play");

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
