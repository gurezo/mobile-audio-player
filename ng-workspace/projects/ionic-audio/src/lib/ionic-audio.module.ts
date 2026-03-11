import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioTrackComponent } from './ionic-audio-track-component';
import { AudioTrackProgressComponent, AudioTrackProgressBarComponent } from './ionic-audio-track-progress-component';
import { AudioTrackPlayComponent } from './ionic-audio-track-play-component';
import { AudioTimePipe } from './ionic-audio-time-pipe';
import { AudioPlaylistItemDirective } from './ionic-audio-playlist-item-directive';
import { AudioProvider } from './ionic-audio-providers';

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
