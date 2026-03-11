import { TestBed } from '@angular/core/testing';

import { IonicAudioService } from './ionic-audio.service';

describe('IonicAudioService', () => {
  let service: IonicAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
