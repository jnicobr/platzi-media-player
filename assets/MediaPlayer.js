function MediaPlayer(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];

    this._initPlugins();
  }

  MediaPlayer.prototype._initPlugins = function () {
    const player = {
      play: () => this.play(),
      pause: () => this.pause(),
      // Inside the get & set functions 'this' changes from MediaPlayer scope to the player object scope
      media: this.media, // Gives access to video element from player
      get muted() {
        return this.media.muted;
      },
      set muted(isMuted) {
        this.media.muted = isMuted;
      },
      get paused() {
        return this.media.paused;
      }
    }

    // console.log(player);
    /**
     {media: video.movie, play: ƒ, pause: ƒ}
        media: video.movie
        muted: (...) // Virtual property declared!!
        pause: () => this.pause()
        play: () => this.play()
        get muted: ƒ muted()
        set muted: ƒ muted(isMuted)
        [[Prototype]]: Object
     */

    this.plugins.forEach(plugin => {
      plugin.run(player);
    })
  }

  MediaPlayer.prototype.play = function() {
    this.media.play();
  };

  MediaPlayer.prototype.pause = function() {
    this.media.pause();
  };

  MediaPlayer.prototype.togglePlay = function() {
    if (this.media.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  MediaPlayer.prototype.mute = function () {
    this.media.muted = true;
  }

  MediaPlayer.prototype.unmute = function () {
    this.media.muted = false;
  }

export default MediaPlayer;