import { type Playlist, type Song } from "@/lib/data";

interface CurrentMusic {
  playlist: null | Playlist;
  song: null | Song;
  songs: Song[];
}

type IsPlaying = boolean;
type Volume = number;

export interface State {
  currentMusic: CurrentMusic;
  isPlaying: IsPlaying;
  volume: Volume;
  setCurrentMusic: (currentMusic: CurrentMusic) => void;
  setIsPlaying: (isPlaying: IsPlaying) => void;
  setVolume: (volume: Volume) => void;
}
