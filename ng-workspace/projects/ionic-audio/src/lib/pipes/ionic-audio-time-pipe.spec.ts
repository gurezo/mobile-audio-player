import { AudioTimePipe } from './ionic-audio-time-pipe';

describe('AudioTimePipe', () => {
  it('should format seconds to mm:ss', () => {
    const pipe = new AudioTimePipe();
    expect(pipe.transform(5)).toBe('00:05');
    expect(pipe.transform(65)).toBe('01:05');
  });

  it('should format to hh:mm:ss when over an hour', () => {
    const pipe = new AudioTimePipe();
    // 1 hour, 2 minutes, 3 seconds
    const value = 1 * 60 * 60 + 2 * 60 + 3;
    expect(pipe.transform(value)).toBe('01:02:03');
  });

  it('should return empty string for undefined or NaN', () => {
    const pipe = new AudioTimePipe();
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(Number.NaN)).toBe('');
  });
}

