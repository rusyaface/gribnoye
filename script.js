(function () {
  var n = 6;
  var state = { i: 0, playing: true, muted: true };

  var track = document.getElementById('track');
  var counter = document.getElementById('counter');
  var video = document.getElementById('heroVideo');
  var controls = document.getElementById('controls');
  var pauseIcon = document.getElementById('pauseIcon');
  var playIcon = document.getElementById('playIcon');
  var soundOffIcon = document.getElementById('soundOffIcon');
  var soundOnIcon = document.getElementById('soundOnIcon');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var playBtn = document.getElementById('playBtn');
  var muteBtn = document.getElementById('muteBtn');

  function apply() {
    track.style.transform = 'translateX(' + (-state.i * 100) + '%)';
    counter.textContent = (state.i + 1) + ' / ' + n;
    controls.style.display = state.i === 0 ? 'flex' : 'none';
    pauseIcon.classList.toggle('is-hidden', !state.playing);
    playIcon.classList.toggle('is-hidden', state.playing);
    soundOffIcon.classList.toggle('is-hidden', !state.muted);
    soundOnIcon.classList.toggle('is-hidden', state.muted);
  }

  function move(d) {
    state.i = (state.i + d + n) % n;
    apply();
  }

  function togglePlay() {
    if (!video) return;
    if (video.paused) { video.play(); state.playing = true; }
    else { video.pause(); state.playing = false; }
    apply();
  }

  function toggleMute() {
    if (!video) return;
    video.muted = !video.muted;
    state.muted = video.muted;
    apply();
  }

  prevBtn.addEventListener('click', function () { move(-1); });
  nextBtn.addEventListener('click', function () { move(1); });
  playBtn.addEventListener('click', togglePlay);
  muteBtn.addEventListener('click', toggleMute);

  // basic swipe support on touch devices
  var track_el = track;
  var touchStartX = null;
  track_el.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track_el.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
    touchStartX = null;
  });

  apply();
})();
