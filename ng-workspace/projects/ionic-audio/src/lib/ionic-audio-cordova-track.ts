import { Injectable, NgZone } from '@angular/core';
import { IAudioTrack } from './ionic-audio-interfaces';

declare const Media: any;
declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class CordovaAudioTrack implements IAudioTrack {
  src: string;
  private audio: any;
  public isPlaying = false;
  public isFinished = false;
  private _progress = 0;
  private _completed = 0;
  private _duration: number | undefined;
  private _id: number | undefined;
  private _isLoading = false;
  private _hasLoaded = false;
  private _timer: any;
  private _ngZone!: NgZone;

  constructor() {
    this.src = '';
    if (window.cordova === undefined || window.Media === undefined) {
      console.log('Cordova Media is not available');
      return;
    }
    this._ngZone = new NgZone({ enableLongStackTrace: false });
    this.createAudio();
  }

  private createAudio() {
    this.audio = new Media(
      this.src,
      () => {
        console.log('Finished playback');
        this.stopTimer();
        this._ngZone.run(() => {
          this._progress = 0;
          this._completed = 0;
          this._hasLoaded = false;
          this.isFinished = true;
          this.isPlaying = false;
        });
        this.destroy();
      },
      (err: any) => {
        console.log(`Audio error => track ${this.src}`, err);
      },
      (status: number) => {
        this._ngZone.run(() => {
          switch (status) {
            case Media.MEDIA_STARTING:
              console.log(`Loaded track ${this.src}`);
              this._hasLoaded = true;
              break;
            case Media.MEDIA_RUNNING:
              console.log(`Playing track ${this.src}`);
              this.isPlaying = true;
              this._isLoading = false;
              break;
            case Media.MEDIA_PAUSED:
              this.isPlaying = false;
              break;
            case Media.MEDIA_STOPPED:
              this.isPlaying = false;
              break;
          }
        });
      },
    );
  }

  private startTimer() {
    this._timer = setInterval(() => {
      if (this._duration === undefined) {
        const duration: number = this.audio.getDuration();
        if (duration > 0) {
          this._duration = Math.round(duration * 100) / 100;
        }
      }

      this.audio.getCurrentPosition(
        (position: number) =>
          this._ngZone.run(() => {
            if (position > -1) {
              this._progress = Math.round(position * 100) / 100;
              this._completed =
                (this._duration ?? 0) > 0
                  ? Math.round((this._progress / (this._duration as number)) * 100) / 100
                  : 0;
            }
          }),
        (e: any) => {
          console.log('Error getting position', e);
        },
      );
    }, 1000);
  }

  private stopTimer() {
    clearInterval(this._timer);
  }

  get id(): number {
    return this._id as number;
  }

  set id(v: number) {
    this._id = v;
  }

  get duration(): number {
    return this._duration as number;
  }

  get progress(): number {
    return this._progress;
  }

  get completed(): number {
    return this._completed;
  }

  get error(): MediaError {
    return this.audio.error;
  }

  get canPlay(): boolean {
    return true;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get hasLoaded(): boolean {
    return this._hasLoaded;
  }

  play(): void {
    if (!this.audio) {
      this.createAudio();
    }

    if (!this._hasLoaded) {
      console.log(`Loading track ${this.src}`);
      this._isLoading = true;
    }

    this.audio.play();
    this.startTimer();
  }

  pause(): void {
    if (!this.isPlaying) return;
    console.log(`Pausing track ${this.src}`);
    this.audio.pause();
    this.stopTimer();
  }

  stop(): void {
    this.audio.stop();
  }

  seekTo(time: number): void {
    this.audio.seekTo(time * 1000);
  }

  destroy(): void {
    this.audio.release();
    console.log(`Released track ${this.src}`);
  }
}

