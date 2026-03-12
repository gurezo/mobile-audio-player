import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ITrackConstraint, IAudioTrack } from '../../models/ionic-audio-interfaces';
import { AudioProvider } from '../../services/ionic-audio-providers';
import { WebAudioTrack } from '../../core/ionic-audio-web-track';

@Component({
  selector: 'audio-track',
  templateUrl: './ionic-audio-track.component.html',
  styleUrls: ['./ionic-audio-track.component.scss'],
  standalone: false,
})
export class AudioTrackComponent implements OnChanges, DoCheck, IAudioTrack {
  @Input() track!: ITrackConstraint;
  @Input() autoplay = false;

  @Output() onFinish = new EventEmitter<ITrackConstraint>();
  @Output() onPause = new EventEmitter<number>();
  @Output() onPlay = new EventEmitter<number>();

  private _audioTrack!: IAudioTrack | undefined;

  constructor(private _audioProvider: AudioProvider) {}

  ngOnInit() {
    if (!this.track) return;

    if (!(this.track instanceof WebAudioTrack)) {
      this._audioTrack = this._audioProvider.create(this.track);
    } else if (this._audioTrack) {
      Object.assign(this._audioTrack, this.track);
      this._audioProvider.add(this._audioTrack);
    }

    if (this._audioTrack) {
      this.track.id = this._audioTrack.id;
    }
  }

  play() {
    if (!this._audioTrack) return;
    this.onPlay.emit(this._audioTrack.id);
    this._audioTrack.play();
    this._audioProvider.current = this._audioTrack.id;
  }

  pause() {
    if (!this._audioTrack) return;
    this.onPause.emit(this._audioTrack.id);
    this._audioTrack.pause();
    this._audioProvider.current = undefined as any;
  }

  toggle() {
    if (!this._audioTrack) return;
    if (this._audioTrack.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seekTo(time: number) {
    if (!this._audioTrack) return;
    this._audioTrack.seekTo(time);
  }

  get id(): number {
    return this._audioTrack ? this._audioTrack.id : -1;
  }

  get src(): string {
    return this._audioTrack?.src ?? this.track?.src ?? '';
  }

  stop(): void {
    this._audioTrack?.stop();
  }

  destroy(): void {
    this._audioTrack?.destroy();
  }

  get art(): string | undefined {
    return this.track ? this.track.art : undefined;
  }

  get artist(): string | undefined {
    return this.track ? this.track.artist : undefined;
  }

  get title(): string | undefined {
    return this.track ? this.track.title : undefined;
  }

  get progress(): number {
    return this._audioTrack ? this._audioTrack.progress : 0;
  }

  get isPlaying(): boolean {
    return !!this._audioTrack && this._audioTrack.isPlaying;
  }

  get isFinished(): boolean {
    return !!this._audioTrack && this._audioTrack.isFinished;
  }

  get duration(): number {
    return this._audioTrack ? this._audioTrack.duration : 0;
  }

  get completed(): number {
    return this._audioTrack ? this._audioTrack.completed : 0;
  }

  get canPlay() {
    return !!this._audioTrack && this._audioTrack.canPlay;
  }

  get error() {
    return this._audioTrack ? this._audioTrack.error : undefined;
  }

  get isLoading(): boolean {
    return !!this._audioTrack && this._audioTrack.isLoading;
  }

  get hasLoaded(): boolean {
    return !!this._audioTrack && this._audioTrack.hasLoaded;
  }

  ngDoCheck() {
    if (this._audioTrack && this._audioTrack.isFinished) {
      this.onFinish.emit(this.track);
      this._audioTrack.isFinished = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['track']?.firstChange) return;
    if (this._audioTrack && this._audioTrack.isPlaying) this._audioTrack.stop();
    this._audioTrack = this._audioProvider.create(changes['track'].currentValue);

    console.log('ngOnChanges -> new audio track detected', this._audioTrack);

    if (this.autoplay && this._audioTrack) {
      this._audioTrack.play();
    }
  }
}

