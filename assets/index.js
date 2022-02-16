import MediaPlayer from './MediaPlayer.js';
import AutoPlay from '../plugins/AutoPlay.js';
import AutoPause from '../plugins/AutoPause.js';

  const video = document.querySelector('video');
  const player = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause(0.25)] });

  const button = document.querySelector('button');
  button.onclick = () => player.togglePlay();

  // Checks the navigator supports service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .catch(error => {
        console.log(error.message);
      });
  }