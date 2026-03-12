import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IAudioTrack } from '../../models/ionic-audio-interfaces';

@Component({
  selector: 'audio-track-progress-bar',
  templateUrl: './ionic-audio-track-progress-bar.component.html',
  styleUrls: ['./ionic-audio-track-progress-bar.component.scss'],
  standalone: false,
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

