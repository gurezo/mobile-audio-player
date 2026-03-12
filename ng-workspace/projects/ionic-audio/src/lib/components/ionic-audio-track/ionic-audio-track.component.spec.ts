import { AudioTrackComponent } from './ionic-audio-track.component';
import { AudioProvider } from '../../services/ionic-audio-providers';
import { ITrackConstraint } from '../../models/ionic-audio-interfaces';

class MockAudioProvider extends AudioProvider {
  override create(track: ITrackConstraint): any {
    return {
      ...track,
      id: 0,
      isPlaying: false,
      play: () => {},
      pause: () => {},
      stop: () => {},
      seekTo: () => {},
      destroy: () => {},
      duration: 0,
      progress: 0,
      completed: 0,
      isFinished: false,
      isLoading: false,
      hasLoaded: false,
      canPlay: true,
      error: undefined,
    };
  }
}

describe('AudioTrackComponent', () => {
  let component: AudioTrackComponent;

  beforeEach(() => {
    component = new AudioTrackComponent(new MockAudioProvider());
    component.track = { src: 'test.mp3' };
  });

  it('should initialize without errors', () => {
    component.ngOnInit();
    expect(component.src).toBe('test.mp3');
  });
});

