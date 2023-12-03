import { useEffect, useRef, useState } from "react";

import { PauseIcon, PlayIcon } from ".";

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("") : undefined
  );

  useEffect(() => {
    audioRef.current.src = "/music/1/01.mp3";
  }, [])

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
    }

    setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        Current song...
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>

      <div className="grid place-content-center">
        Volume control ...
      </div>

      <audio ref={audioRef} />
    </div>
  );
}