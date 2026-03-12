import { Component, ElementRef, Input } from '@angular/core';
import { IAudioTrack } from '../../models/ionic-audio-interfaces';

@Component({
  selector: 'audio-track-play',
  templateUrl: './ionic-audio-track-play.component.html',
  styleUrls: ['./ionic-audio-track-play.component.scss'],
  standalone: false,
})
export class AudioTrackPlayComponent {
  @Input() audioTrack!: IAudioTrack;

  @Input()
  set light(_val: boolean) {
    this.el.nativeElement.firstElementChild?.classList.add('light');
  }

  @Input()
  set dark(_val: boolean) {
    this.el.nativeElement.firstElementChild?.classList.add('dark');
  }

  constructor(private el: ElementRef<HTMLElement>) {}

  toggle(_event: Event) {
    if (!this.audioTrack) return;
    if (this.audioTrack.isPlaying) {
      this.audioTrack.pause();
    } else {
      this.audioTrack.play();
    }
  }
}

