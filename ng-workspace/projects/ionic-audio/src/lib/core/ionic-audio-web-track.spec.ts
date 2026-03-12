import { WebAudioTrack } from './ionic-audio-web-track';

describe('WebAudioTrack', () => {
  it('should format time correctly', () => {
    expect(WebAudioTrack.formatTime(5)).toBe('00:05');
    expect(WebAudioTrack.formatTime(65)).toBe('01:05');
    const oneHourTwoMinutesThreeSeconds = 1 * 60 * 60 + 2 * 60 + 3;
    expect(WebAudioTrack.formatTime(oneHourTwoMinutesThreeSeconds)).toBe('01:02:03');
  });

  it('should default initial state', () => {
    const track = new WebAudioTrack();
    expect(track.isPlaying).toBeFalse();
    expect(track.isFinished).toBeFalse();
    expect(track.completed).toBe(0);
  });
}

