import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioTrackComponent } from './components/ionic-audio-track/ionic-audio-track.component';
import { AudioTrackProgressComponent } from './components/ionic-audio-track-progress/ionic-audio-track-progress.component';
import { AudioTrackProgressBarComponent } from './components/ionic-audio-track-progress-bar/ionic-audio-track-progress-bar.component';
import { AudioTrackPlayComponent } from './components/ionic-audio-track-play/ionic-audio-track-play.component';
import { AudioTimePipe } from './pipes/ionic-audio-time-pipe';
import { AudioPlaylistItemDirective } from './directives/ionic-audio-playlist-item-directive';
import { AudioProvider } from './services/ionic-audio-providers';

export function declarations() {
  return [
    AudioTrackComponent,
    AudioTrackProgressComponent,
    AudioTrackProgressBarComponent,
    AudioTrackPlayComponent,
    AudioTimePipe,
    AudioPlaylistItemDirective,
  ];
}

@NgModule({
  imports: [CommonModule],
  declarations: declarations(),
  exports: declarations(),
})
export class IonicAudioModule {
  static forRoot(audioProviderFactory: any): ModuleWithProviders<IonicAudioModule> {
    return {
      ngModule: IonicAudioModule,
      providers: [{ provide: AudioProvider, useFactory: audioProviderFactory }],
    };
  }
}
