# Mobile Audio Player

This library is a modernized fork of:

- [https://github.com/johnnybui/ionic-audio3](https://github.com/johnnybui/ionic-audio3)
- [https://github.com/arielfaur/ionic-audio](https://github.com/arielfaur/ionic-audio)

It provides an audio player component set for mobile-focused Ionic applications that works out of the box in the browser and on device using an underlying audio provider (Web Audio in the browser; native audio via Capacitor / Cordova on device).

## Origin

This project is a modernized fork of:

- [https://github.com/johnnybui/ionic-audio3](https://github.com/johnnybui/ionic-audio3)

Originally based on:

- [https://github.com/arielfaur/ionic-audio](https://github.com/arielfaur/ionic-audio)

## Current stack (this repo)

This project has been **migrated** from Ionic 3 + Angular 5 to a modern Angular workspace:

- **Angular** 21
- **Ionic Angular** 8
- **Capacitor** 8 (replacing Cordova for native)
- **Vitest** for unit tests

- **Library**: `projects/ionic-audio` — build with `npm run build` (from repo root) or `npm run build:lib`.
- **Demo app**: `projects/ionic-audio-demo` — run with `npm start`, tests with `npm test`.

---

### Brief notes about some of the issues reported lately
- Keep in mind that in certain scenarios you might be better off using standard HTML 5 audio components instead of this plugin
- The plugin allows for simultaneous playback (multiple tracks), you are responsible for stopping / resuming playback responding to events
- Some audio formats / codecs may not be supported, you might need to convert your audio files

## Installation

### Modern package (Angular 21 + Ionic Angular 8)

Install from npm:

```
npm install @gurezo/mobile-audio-player
```

In your Angular app, import `IonicAudioModule` from `@gurezo/mobile-audio-player` and add `provideIonicAngular()` (or `IonicModule.forRoot()`) as needed. See the demo app in `projects/ionic-audio-demo` for a full example.

# Original Author

* **Ariel Faur** [@arielfaur](https://github.com/arielfaur)

## License

This project is licensed under the MIT License.

Original upstream authors retain copyright
for their contributions.
Additional modernization and maintenance are by Akihiko Kigure.

See the [LICENSE.md](LICENSE.md) file for full details.

## Development notes

- Conventional Commits とブランチ運用ルールについては `docs/conventional-commits-strategy.md` を参照してください。
