const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackSpeedSlider = player.querySelector('input[name="playbackSpeed"]');
const skipButtons = player.querySelectorAll('[data-skip]');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');

// Play or pause the video
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update the play/pause button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Adjust volume
function handleVolumeChange() {
  video.volume = this.value;
}

// Adjust playback speed
function handleSpeedChange() {
  video.playbackRate = this.value;
}

// Skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Seek to a new position in the video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeedSlider.addEventListener('input', handleSpeedChange);
skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
