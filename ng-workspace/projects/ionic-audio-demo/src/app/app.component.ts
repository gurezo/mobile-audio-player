import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicAudioModule, ITrackConstraint } from 'ionic-audio';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IonicAudioModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
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

  async ngOnInit() {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await SplashScreen.hide();
    } catch {
      // ignore if not available
    }

    try {
      await StatusBar.setStyle({ style: Style.Dark });
    } catch {
      // ignore if not available
    }

    try {
      await Keyboard.setScroll({ isDisabled: true });
    } catch {
      // ignore if not available
    }
  }
}
