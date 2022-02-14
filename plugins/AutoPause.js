// If the video player exits the visible screen more than a 25% the video will auto-pause. If re-enter more than 25, will auto-play
class AutoPause {
    constructor(thereshold) {
        this.thereshold = thereshold,
        this.handleIntersection = this.handleIntersection.bind(this) // So this inside handleIntersection refers to AutoPause
    }
    
    // Mandatory run method for the app's plugins
    run(player) {
        // Assigned to be used on other methods
        this.player = player;

        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.thereshold
        });

        observer.observe(this.player.media);
    }

    /**
     * IntersectionObserver passes a list of every element being observed, called entries
     * 
     * @param {IntersectionObserverEntry[]} entries 
     */
    handleIntersection(entries) {
        const entry = entries[0]; // Only entry being observed
        entry.isIntersecting ? this.player.play() : this.player.pause();
    }
}

export default AutoPause;