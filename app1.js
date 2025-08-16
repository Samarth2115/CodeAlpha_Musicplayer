const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");

// Playlist (replace with your songs)
const songs = [
  { title: "Song One", artist: "Artist A", src: "song1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "song2.mp3" },
  { title: "Song Three", artist: "Artist C", src: "song3.mp3" }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

loadSong(songs[songIndex]);

// Play
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
}

// Pause
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶";
}

// Toggle play
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Previous
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    // Update time
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0"+currentSeconds : currentSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? "0"+durationSeconds : durationSeconds}`;
  }
});

// Seek
progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto play next
audio.addEventListener("ended", () => {
  nextBtn.click();
});
