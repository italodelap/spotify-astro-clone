import { getInfoPlaylist } from "@/services/playlist";
import { useStore } from "@/store/useStore";

import { PauseIcon, PlayIcon } from "./Player";

export function CardPlayButton({ id, size = "small" }) {
  const currentMusic = useStore((state) => state.currentMusic);
  const isPlaying = useStore((state) => state.isPlaying);
  const setCurrentMusic = useStore((state) => state.setCurrentMusic);
  const setIsPlaying = useStore((state) => state.setIsPlaying);

  const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    getInfoPlaylist(id).then(({ songs, playlist }) => {
      setIsPlaying(true);
      setCurrentMusic({ song: songs[0], songs, playlist });
    });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingPlaylist ? <PauseIcon className={iconClassName} /> : <PlayIcon className={iconClassName} />}
    </button>
  );
}
