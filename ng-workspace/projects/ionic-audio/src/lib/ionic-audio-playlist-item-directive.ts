import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AudioProvider } from './ionic-audio-providers';
import { ITrackConstraint } from './ionic-audio-interfaces';

@Directive({
  selector: '[audio-playlist-item]',
})
export class AudioPlaylistItemDirective {
  @Input() track!: ITrackConstraint;
  @Input() currentTrack!: ITrackConstraint;
  @Output() currentTrackChange = new EventEmitter<ITrackConstraint>();

  private static _currentIndex = -1;
  private static _tracklist: ITrackConstraint[] = [];
  private _index!: number;

  constructor(private _audioProvider: AudioProvider) {}

  ngOnInit() {
    this._index = AudioPlaylistItemDirective._tracklist.push(this.track) - 1;
  }

  @HostListener('click')
  onClick() {
    this._play();
  }

  next() {
    if (
      AudioPlaylistItemDirective._currentIndex > -1 &&
      AudioPlaylistItemDirective._currentIndex < AudioPlaylistItemDirective._tracklist.length - 1
    ) {
      this._play(++AudioPlaylistItemDirective._currentIndex);
    }
  }

  get currentIndex() {
    return AudioPlaylistItemDirective._currentIndex;
  }

  private _play(index?: number) {
    const targetIndex = index ?? this._index;

    console.log('Playing', targetIndex);

    AudioPlaylistItemDirective._currentIndex = targetIndex;

    this.currentTrack = AudioPlaylistItemDirective._tracklist[targetIndex];
    this.currentTrackChange.emit(this.currentTrack);
  }
}

