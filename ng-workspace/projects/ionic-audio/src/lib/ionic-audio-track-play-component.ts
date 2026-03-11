import { Component, ElementRef, Input } from '@angular/core';
import { IAudioTrack } from './ionic-audio-interfaces';

@Component({
  selector: 'audio-track-play',
  template: `
    <button
      type="button"
      (click)="toggle($event)"
      [disabled]="audioTrack?.error || audioTrack?.isLoading"
    >
      @if (audioTrack?.isLoading && !audioTrack?.error) {
        <ng-content></ng-content>
      } @else if (audioTrack?.isPlaying) {
        <span>❚❚</span>
      } @else {
        <span>▶</span>
      }
    </button>
  `,
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

