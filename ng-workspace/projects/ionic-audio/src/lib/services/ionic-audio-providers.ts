import { Injectable } from '@angular/core';
import { IAudioProvider, ITrackConstraint, IAudioTrack } from '../models/ionic-audio-interfaces';
import { WebAudioTrack } from '../core/ionic-audio-web-track';

export function defaultAudioProviderFactory() {
  return new WebAudioProvider();
}

@Injectable()
export abstract class AudioProvider implements IAudioProvider {
  protected static tracks: IAudioTrack[] = [];
  protected _current: number | undefined;

  create(track: ITrackConstraint): IAudioTrack {
    console.error('Not implemented in base class');
    return null as any;
  }

  replace(oldAudioTrack: IAudioTrack, newTrack: ITrackConstraint): IAudioTrack {
    console.error('Not implemented in base class');
    return null as any;
  }

  add(audioTrack: IAudioTrack): void {
    AudioProvider.tracks.push(audioTrack);
  }

  play(index: number): void {
    if (index === undefined || index > AudioProvider.tracks.length - 1) return;
    this._current = index;
    AudioProvider.tracks[index].play();
  }

  pause(index?: number): void {
    if (this._current === undefined || (index ?? this._current) > AudioProvider.tracks.length - 1) return;
    const target = index ?? this._current;
    AudioProvider.tracks[target].pause();
  }

  stop(index?: number): void {
    if (this._current === undefined || (index ?? this._current) > AudioProvider.tracks.length - 1) return;
    const target = index ?? this._current;
    AudioProvider.tracks[target].stop();
    this._current = undefined;
  }

  get tracks(): IAudioTrack[] {
    return AudioProvider.tracks;
  }

  get current(): number {
    return this._current as number;
  }

  set current(v: number) {
    this._current = v;
  }
}

@Injectable()
export class WebAudioProvider extends AudioProvider {
  constructor() {
    super();
    console.log('Using Web Audio provider');
  }

  override create(track: ITrackConstraint): IAudioTrack {
    const audioTrack = new WebAudioTrack();
    audioTrack.src = track.src;
    Object.assign(audioTrack, track);
    const trackId = WebAudioProvider.tracks.push(audioTrack);
    audioTrack.id = trackId - 1;
    return audioTrack;
  }

  override replace(oldAudioTrack: IAudioTrack, newTrack: ITrackConstraint): IAudioTrack {
    const index = WebAudioProvider.tracks.findIndex(track => Object.is(oldAudioTrack, track));
    const newAudioTrack =
      newTrack instanceof WebAudioTrack ? newTrack : Object.assign(new WebAudioTrack(), newTrack);

    if (index > -1) {
      WebAudioProvider.tracks.splice(index, 1, newAudioTrack);
    } else {
      const trackId = WebAudioProvider.tracks.push(newAudioTrack);
      newAudioTrack.id = trackId - 1;
    }

    console.log('Replaced audio track', oldAudioTrack, newAudioTrack);
    console.log('Current track list', WebAudioProvider.tracks);
    return newAudioTrack;
  }
}

