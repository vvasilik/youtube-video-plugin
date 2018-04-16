# youtube-video-plugin
Use `class="_youtube-video"` - or some another class end `data-src="YOUTUBE VIDEO CODE"` in HTML

`npm install youtube-video-plugin -D`

```
import { YoutubePlay } from 'youtube-video-plugin';

YoutubePlay.run({
    className: '_youtube-video',
    mute: 1,
    autoplay: 0,
    controls: 0,
    showinfo: 0,
    loop: 1,
    width: 300,
    height: 200
});
```
