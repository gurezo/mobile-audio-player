import { AudioProvider, WebAudioProvider } from './ionic-audio-providers';
import { ITrackConstraint } from '../models/ionic-audio-interfaces';

describe('WebAudioProvider', () => {
  let provider: WebAudioProvider;

  beforeEach(() => {
    provider = new WebAudioProvider();
  });

  it('should create an audio track and add it to the list', () => {
    const track: ITrackConstraint = { src: 'test.mp3' };
    const audioTrack = provider.create(track);

    expect(audioTrack.id).toBeGreaterThanOrEqual(0);
    expect(provider.tracks.length).toBeGreaterThan(0);
  });

  it('should play and stop by index without throwing', () => {
    const track: ITrackConstraint = { src: 'test.mp3' };
    provider.create(track);

    // These calls should be safe even if underlying audio element cannot play in test env
    provider.play(0);
    provider.pause(0);
    provider.stop(0);

    expect(provider.current).toBeGreaterThanOrEqual(0);
  });
});

describe('AudioProvider base class', () => {
  it('should maintain a shared track list', () => {
    class TestProvider extends AudioProvider {}

    const p1 = new TestProvider();
    const p2 = new TestProvider();

    const fakeTrack: any = { id: 0, play: () => {}, pause: () => {}, stop: () => {} };
    p1.add(fakeTrack);

    expect(p2.tracks.length).toBeGreaterThan(0);
  });
});

