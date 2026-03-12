import { Component, Input } from '@angular/core';
import { IAudioTrack } from '../../models/ionic-audio-interfaces';

@Component({
  selector: 'audio-track-progress',
  templateUrl: './ionic-audio-track-progress.component.html',
  styleUrls: ['./ionic-audio-track-progress.component.scss'],
  standalone: false,
})
export class AudioTrackProgressComponent {
  @Input() audioTrack!: IAudioTrack;
}

