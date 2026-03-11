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
      <span *ngIf="audioTrack?.isPlaying && !audioTrack?.isLoading">❚❚</span>
      <span *ngIf="!audioTrack?.isPlaying && !audioTrack?.isLoading">▶</span>
      <ng-content *ngIf="audioTrack?.isLoading && !audioTrack?.error"></ng-content>
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

