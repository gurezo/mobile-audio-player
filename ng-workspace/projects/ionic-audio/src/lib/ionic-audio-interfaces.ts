export interface IAudioProvider {
  current: number;
  tracks: IAudioTrack[];

  create(track: ITrackConstraint): IAudioTrack;
  replace(oldAudioTrack: IAudioTrack, newTrack: ITrackConstraint): IAudioTrack;
  add(track: IAudioTrack): void;
  play(index: number): void;
  pause(index?: number): void;
  stop(index?: number): void;
}

export interface ITrackConstraint {
  id?: number;
  src: string;
  title?: string;
  artist?: string;
  art?: string;
  preload?: string;
}

export interface IAudioTrack extends ITrackConstraint {
  src: string;
  id: number;
  isPlaying: boolean;
  isLoading: boolean;
  isFinished: boolean;
  hasLoaded: boolean;
  duration: number;
  progress: number;
  completed: number;
  canPlay: boolean;
  error: MediaError;

  play(): void;
  pause(): void;
  stop(): void;
  seekTo(time: number): void;
  destroy(): void;
}

