import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IonicAudioModule, ITrackConstraint } from 'ionic-audio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, IonicAudioModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ionic-audio-demo';

  tracks: ITrackConstraint[] = [
    {
      src: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
      artist: 'Test Artist',
      title: 'Sample Track 1',
      art: 'https://placehold.co/64x64',
      preload: 'metadata',
    },
  ];
}
