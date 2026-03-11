import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app.routes';
import { AudioProvider, defaultAudioProviderFactory } from 'ionic-audio';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    { provide: AudioProvider, useFactory: defaultAudioProviderFactory },
  ],
};
