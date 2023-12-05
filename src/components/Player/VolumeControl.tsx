import { useRef } from "react";

import { useStore } from "@/store/useStore";

import { VolumeHighIcon, VolumeLowIcon, VolumeMediumIcon, VolumeSilenceIcon } from ".";

export function VolumeControl() {
  const volume = useStore((state) => state.volume);
  const setVolume = useStore((state) => state.setVolume);

  const previousVolumeRef = useRef(volume);
  const isVolumeSilenced = volume < 0.1;

  const handleClickVolumeIcon = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  }

  return (
    <div className="flex justify-center items-center gap-x-2 text-white">
      <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolumeIcon}>
        {isVolumeSilenced
          ? <VolumeSilenceIcon />
          : volume < 0.34
            ? <VolumeLowIcon />
            : volume < 0.67
              ? <VolumeMediumIcon />
              : <VolumeHighIcon />
        }
      </button>
      <input
        min={0}
        max={100}
        type="range"
        className="w-[95px]"
        value={volume * 100}
        onInput={(evt) => { setVolume(Number(evt.currentTarget.value) / 100) }}
      />
    </div>
  );
}
