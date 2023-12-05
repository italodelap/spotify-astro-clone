import { useEffect, useRef } from "react";

import { useStore } from "@/store/useStore";
import { CurrentSong, PauseIcon, PlayIcon, VolumeControl } from ".";

export function Player() {
  const currentMusic = useStore((state) => state.currentMusic);
  const isPlaying = useStore((state) => state.isPlaying);
  const volume = useStore((state) => state.volume);
  const setIsPlaying = useStore((state) => state.setIsPlaying);

  const audioRef = useRef<HTMLAudioElement>(typeof Audio !== "undefined" ? new Audio() : null);

  const playMusic = () => { setTimeout(() => { audioRef.current!.play() }, 1) }

  useEffect(() => {
    isPlaying ? playMusic() : audioRef.current!.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current!.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist } = currentMusic
    if (song) {
      audioRef.current!.src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current!.volume = volume;
      playMusic();
    }
  }, [currentMusic]);

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <button className="bg-white rounded-full p-2" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon className="" /> : <PlayIcon className="" />}
          </button>
          <audio ref={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}