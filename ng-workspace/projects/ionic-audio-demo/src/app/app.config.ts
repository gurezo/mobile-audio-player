import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AudioProvider, defaultAudioProviderFactory } from 'ionic-audio';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: AudioProvider,
      useFactory: defaultAudioProviderFactory,
    },
  ],
};
