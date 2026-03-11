# Ionic Audio (ionic-audio3)

##### Forked from [arielfaur's project](https://github.com/arielfaur/ionic-audio)

An audio player plugin for Ionic that works out of the box in the browser and on device using an underlying audio provider (Web Audio in the browser; Cordova Media or Web Audio on device).

## Current stack (this repo)

The project has been **migrated** from Ionic 3 + Angular 5 to a modern workspace in **`ng-workspace/`**:

- **Angular** 21
- **Ionic Angular** 8
- **Capacitor** 8 (replacing Cordova for native)
- **Vitest** for unit tests

- **Library**: `ng-workspace/projects/ionic-audio` — build with `npm run build` (from repo root) or `cd ng-workspace && npm run build:lib`.
- **Demo app**: `ng-workspace/projects/ionic-audio-demo` — run with `cd ng-workspace && npm start`, tests with `cd ng-workspace && npm test`.

See **`ng-workspace/README.md`** for development server, build, and test commands.

---

### Brief notes about some of the issues reported lately
- Keep in mind that in certain scenarios you might be better off using standard HTML 5 audio components instead of this plugin
- The plugin allows for simultaneous playback (multiple tracks), you are responsible for stopping / resuming playback responding to events
- Some audio formats / codecs may not be supported, you might need to convert your audio files

## API Docs

[API](http://arielfaur.github.io/ionic-audio/2.0/docs/modules/ionic-audio.html)

## Demo

[Demo](https://arielfaur.github.io/ionic-audio-demo/)

## Installation

**Using the migrated package (Angular 21 + Ionic Angular 8):** install from the built library in this repo or from a published version that includes the `ng-workspace` build. In your Angular app, import `IonicAudioModule` from `ionic-audio` and add `provideIonicAngular()` (or `IonicModule.forRoot()`) as needed. See the demo app in `ng-workspace/projects/ionic-audio-demo` for a full example.

**Legacy (Ionic 3 / Angular 5):** the following applied to the original stack.

```
npm install --save ionic-audio3
```

```typescript
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio3';

export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}

@NgModule({
  imports: [
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
  ]
})
export class AppModule {}
```

## Usage

**Import and inject `AudioProvider` where needed (optional)** (legacy example):

```typescript
import {Component, Provider} from '@angular/core';
import { AudioProvider } from 'ionic-audio3';

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  myTracks: any[];
  allTracks: any[];

  constructor(private _audioProvider: AudioProvider) {
    // plugin won't preload data by default, unless preload property is defined within json object - defaults to 'none'
    this.myTracks = [{
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Why Georgia',
      art: 'img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
    },
    {
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Who Says',
      art: 'img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    }];
  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
     // use AudioProvider to control selected track
     this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }
}
```

**Add components to views:**

```html
<ion-list>
  <audio-track #audio *ngFor="let track of myTracks"  [track]="track" (onFinish)="onTrackFinished($event)">
    <ion-item>
      <ion-thumbnail item-left>
        <img src="{{audio.art}}">
        <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>
      </ion-thumbnail>
      <div item-content style="width:100%">
        <p><strong>{{audio.title}}</strong> ⚬ <em>{{audio.artist}}</em></p>
        <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? 'visible' : 'hidden'}"></audio-track-progress-bar>
      </div>
    </ion-item>
  </audio-track>
</ion-list>
```

# Original Author

* **Ariel Faur** [@arielfaur](https://github.com/arielfaur)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Development notes

- Conventional Commits とブランチ運用ルールについては `docs/conventional-commits-strategy.md` を参照してください。
