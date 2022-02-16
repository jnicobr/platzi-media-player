class MediaPlayer {
    media: HTMLMediaElement;
    plugins: Array<any>;

    constructor(config: { el: HTMLMediaElement; plugins: Array<any>; }) {
        this.media = config.el;
        this.plugins = config.plugins || [];

        this.initPlugins();
    }

    private initPlugins() {
        this.plugins.forEach(plugin => {
            plugin.run(this);
        });
    }
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    paused() {
        return this.media.paused;
    }
    togglePlay() {
        if (this.media.paused) {
            this.play();
        } else {
            this.pause();
        }
    }
    mute() {
        this.media.muted = true;
    }
    unmute() {
        this.media.muted = false;
    }
}







export default MediaPlayer;