// create youtube player
var player;
var muteVideo;
var playCount;
function createYouTubePlayer(youTubeVideoId, mute, loop) {
    muteVideo = mute;
    playCount = loop;
    return new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: youTubeVideoId, // youtube video id
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        },
        playerVars: {
            rel: '0',
            modestbranding: '1',
            controls: '0',
            autoplay: '1',
            fs: '0',
            disablekb: '1',
            playlist: youTubeVideoId,
            loop: loop > 1 ? '1' : '0'
        }
    });
}

// autoplay video
function onPlayerReady(event) {
    event.target.playVideo();
    if (muteVideo)
        event.target.mute();
}

// when video ends
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.stopVideo();
        if (--playCount <= 0)
            callback.onEndedPlayer();
        else
            player.playVideo();
    }
}

function onPlayerError(event) {
    callback.onEndedPlayer();
}

function playVideo() {
    //player.playVideo();
}

function pauseVideo() {
    //player.pauseVideo();
}

function getDuration() {
    var duration = 0;
    try {
        duration = player.getDuration();
    } catch (e) {
        return '0';
    }

    if (0 < duration)
        return duration.toString();
    return '1';
}