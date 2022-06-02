(async () => {
  const statusElem = document.querySelector('*[data-wake-lock-status]');

  // Create a reference for the Wake Lock.
  let wakeLock = null;

  // create an async function to request a wake lock
  async function requestWakeLock() {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      statusElem.textContent = 'Wake Lock is active!';
      console.info('Wake Lock is active!');
    } catch (err) {
      // The Wake Lock request has failed - usually system related, such as battery.
      statusElem.textContent = `${err.name}, ${err.message}`;
      console.info(`${err.name}, ${err.message}`);
    }
  }

  const handleVisibilityChange = () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      requestWakeLock();
    }
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  document.addEventListener('fullscreenchange', handleVisibilityChange);
  document.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      toggleFullScreen();
    }
  }, false);

  document.addEventListener('click', () => {
    toggleFullScreen();
  })

  await requestWakeLock();
})();