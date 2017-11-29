export var YoutubePlay = (function() {
    function run(options) {
        setInitOptions();
        setVideoIds();
        if (typeof YT !== "undefined") {
            createVideos();
        } else {
            loadYoutubeAPI();
            listenYouTubeIframeAPIReady();
        }
        
        function listenYouTubeIframeAPIReady() {
            window.onYouTubeIframeAPIReadyList.push(createVideos);
            window.onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady || function() {
                window.onYouTubeIframeAPIReadyList.forEach(function(func) {
                    func();
                });
                window.onYouTubeIframeAPIReadyList = [];
            }
        }

        function setInitOptions() {
            window.onYouTubeIframeAPIReadyPlayers = window.onYouTubeIframeAPIReadyplayers || [];
            window.onYouTubeIframeAPIReadyList = window.onYouTubeIframeAPIReadyList || [];

            options = options || {};
            options.className = (options.className || '_youtube-video');
            options.autoplay = options.autoplay !== 'undefined' ? options.autoplay : 0;
            options.controls = options.controls !== 'undefined' ? options.controls : 1;
            options.showinfo = options.showinfo !== 'undefined' ? options.showinfo : 1;
            options.loop = options.loop !== 'undefined' ? options.loop : 0;
            options.mute = options.mute !== 'undefined' ? options.mute : 0;
            options.width = options.width || 600;
            options.height = options.height || 400;
            options.modestbranding = options.modestbranding !== 'undefined' ? options.modestbranding : 1;
        }
        
        function setVideoIds() {
            const videos = document.querySelectorAll('.' + options.className);
            
            if (videos.length) {
                [].forEach.call(videos, function(video) {
                    video.id = Math.floor(Math.random() * 1000000000);
                });
            }
        }
        
        function loadYoutubeAPI() {
            var tag = document.createElement('script');
        
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        
        function createVideos() {
            const videos = document.querySelectorAll('.' + options.className);
        
            if (videos.length) {
                [].forEach.call(videos, function(video) {
                    video.classList.remove(options.className);
                    createVideo(video);
                })
            }
        }
        
        function createVideo(video) {
            var player = new YT.Player(video.id, {
                width: options.width,
                height: options.height,
                videoId: video.dataset.src,
                playerVars: {
                    'autoplay': options.autoplay,
                    'controls': options.controls,
                    'showinfo': options.showinfo,
                    'loop': options.loop,
                    'playlist': options.loop ? video.dataset.src : null,
                    'modestbranding': options.modestbranding
                },
                events: {
                    'onReady': onPlayerReady
                }
            });

            window.onYouTubeIframeAPIReadyPlayers.push(player);
            
            function onPlayerReady(event) {
                if (options.mute) event.target.mute();
                event.target.playVideo();
            }
        }
    }

    return {
        run: run
    }
})();