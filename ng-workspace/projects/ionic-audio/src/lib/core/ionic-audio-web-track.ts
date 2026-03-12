import { Injectable } from '@angular/core';
import { IAudioTrack } from '../models/ionic-audio-interfaces';

declare const window: any;
window.AudioContext = window['AudioContext'] || window['webkitAudioContext'];

@Injectable({
  providedIn: 'root',
})
export class WebAudioTrack implements IAudioTrack {
  src: string;
  preload: string;
  private audio: HTMLAudioElement | undefined;
  public isPlaying = false;
  public isFinished = false;
  private _progress = 0;
  private _completed = 0;
  private _duration: number | undefined;
  private _id: number | undefined;
  private _isLoading = false;
  private _hasLoaded = false;

  constructor() {
    this.src = '';
    this.preload = 'none';
  }

  private createAudio() {
    this.audio = new Audio();
    this.audio.src = this.src;
    this.audio.preload = this.preload as '' | 'none' | 'metadata' | 'auto';

    this.audio.addEventListener('timeupdate', e => this.onTimeUpdate(e), false);

    this.audio.addEventListener(
      'error',
      err => {
        console.log(`Audio error => track ${this.src}`, err);
        this.isPlaying = false;
      },
      false,
    );

    this.audio.addEventListener(
      'canplay',
      () => {
        this._isLoading = false;
        this._hasLoaded = true;
      },
      false,
    );

    this.audio.addEventListener(
      'playing',
      () => {
        console.log(`Playing track ${this.src}`);
        this.isFinished = false;
        this.isPlaying = true;
      },
      false,
    );

    this.audio.addEventListener(
      'ended',
      () => {
        this.isPlaying = false;
        this.isFinished = true;
        this._progress = 0;
        this._completed = 0;
        this._hasLoaded = false;
        console.log('Finished playback');
      },
      false,
    );

    this.audio.addEventListener(
      'durationchange',
      (e: any) => {
        this._duration = e.target.duration;
      },
      false,
    );
  }

  private onTimeUpdate(_e: Event) {
    if (this.isPlaying && this.audio && this.audio.currentTime > 0) {
      this._progress = this.audio.currentTime;
      this._completed =
        this.audio.duration > 0
          ? Math.trunc((this.audio.currentTime / this.audio.duration) * 100) / 100
          : 0;
    }
  }

  static formatTime(value: number) {
    const s = Math.trunc(value % 60);
    const m = Math.trunc((value / 60) % 60);
    const h = Math.trunc(((value / 60) / 60) % 60);
    return h > 0
      ? `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
      : `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
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
    return (this.audio && this.audio.error) as MediaError;
  }

  get canPlay(): boolean {
    if (!this.audio) return false;
    const format = `audio/${this.audio.src.substring(this.audio.src.lastIndexOf('.') + 1)}`;
    return this.audio.canPlayType(format) !== '';
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

    this.audio!.play();
  }

  pause(): void {
    if (!this.isPlaying || !this.audio) return;
    console.log(`Pausing track ${this.src}`);
    this.audio.pause();
    this.isPlaying = false;
  }

  stop(): void {
    if (!this.audio) return;
    this.pause();
    this.audio.removeEventListener('timeupdate', e => this.onTimeUpdate(e));
    this.isFinished = true;
  }

  seekTo(time: number): void {
    if (!this.audio) return;
    this.audio.currentTime = time;
  }

  destroy(): void {
    this.audio = undefined;
    console.log(`Released track ${this.src}`);
  }
}

