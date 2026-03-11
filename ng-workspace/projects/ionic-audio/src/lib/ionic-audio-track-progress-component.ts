import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IAudioTrack } from './ionic-audio-interfaces';

@Component({
  selector: 'audio-track-progress',
  template: `
    @if (audioTrack?.duration! > 0) {
      <em>{{ audioTrack?.progress | audioTime }} / </em>
    }
    <em>{{ audioTrack?.duration | audioTime }}</em>
  `,
})
export class AudioTrackProgressComponent {
  @Input() audioTrack!: IAudioTrack;
}

@Component({
  selector: 'audio-track-progress-bar',
  template: `
    @if (_showProgress) {
      <time>
        @if (audioTrack) {
          <span [style.opacity]="audioTrack.duration > 0 ? 1 : 0">
            {{ audioTrack.duration > 0 ? (audioTrack.progress | audioTime) : '' }}
          </span>
        }
      </time>
    }
    <input
      type="range"
      #seeker
      min="0"
      [max]="audioTrack ? audioTrack.duration : 0"
      step="any"
      [value]="audioTrack ? audioTrack.progress : 0"
      (change)="seekTo(seeker.value)"
    />
    @if (_showDuration) {
      <time>
        @if (audioTrack) {
          <span [style.opacity]="audioTrack.duration > 0 ? 1 : 0">
            {{ audioTrack.duration | audioTime }}
          </span>
        }
      </time>
    }
  `,
})
export class AudioTrackProgressBarComponent implements OnChanges, DoCheck {
  @Input() audioTrack!: IAudioTrack;
  @Output() onFinish = new EventEmitter<IAudioTrack>();

  _showDuration = false;
  _showProgress = false;

  @Input()
  set progress(_value: boolean) {
    this._showProgress = true;
  }

  get progress() {
    return this._showProgress;
  }

  @Input()
  set duration(_value: boolean) {
    this._showDuration = true;
  }

  get duration() {
    return this._showDuration;
  }

  seekTo(value: any) {
    const numeric = Number(value);
    if (!Number.isNaN(numeric) && this.audioTrack) {
      this.audioTrack.seekTo(numeric);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['audioTrack'] || changes['audioTrack'].firstChange) return;

    const oldTrack: IAudioTrack | undefined = changes['audioTrack'].previousValue;
    if (oldTrack && typeof oldTrack.stop === 'function') {
      oldTrack.stop();
    }
  }

  ngDoCheck() {
    if (this.audioTrack && this.audioTrack.isFinished) {
      this.onFinish.emit(this.audioTrack);
    }
  }
}

