import MediaPlayer from "../assets/MediaPlayer";

/**
 * If the video player exits the visible screen more than a 25% the video will auto-pause. If re-enter more than 25, will auto-play
 * If the tab or the window changes, the video will auto pause and auto play when returning to the video's tab or window
 */
class AutoPause {
    private thereshold: number;
    private player: MediaPlayer;
    private wasPaused: boolean;

    constructor(thereshold: number) {
        this.thereshold = thereshold,
            this.handleIntersection = this.handleIntersection.bind(this), // So this inside handleIntersection refers to AutoPause
            this.handleVisibilityChange = this.handleVisibilityChange.bind(this) // So this inside handleVisibilityChange refers to AutoPause
    }

    // Mandatory run method for the app's plugins
    run(player) {
        // Assigned to be used on other methods
        this.player = player;

        // Instantintiates the observer for percentage of visibility in the viewport
        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.thereshold
        });

        observer.observe(this.player.media);

        // Instantiates the visibility event listener
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    /**
     * IntersectionObserver passes a list of every element being observed, called entries
     */
    private handleIntersection(entries: IntersectionObserverEntry[]) {
        const entry = entries[0]; // Only entry being observed
        entry.isIntersecting ? this.player.play() : this.player.pause();
    }

    /**
     * Pauses the video if the window or tab is not visible & resumes playing if the user returns to the tab or window
     * This, if the video was being played before the user left the tab or window. If not, the video will remain paused
     */
    private handleVisibilityChange() {
        const isVisible = document.visibilityState === 'visible';

        // wasPaused state is checked when the visibility changes to hidden because is always paused when visible
        if (!isVisible) {
            this.wasPaused = this.player.paused();
        }

        // Check if the video was being played when the user left
        if (isVisible && !this.wasPaused) {
            this.player.play();
        } else {
            this.player.pause();
        }
    }
}

export default AutoPause;