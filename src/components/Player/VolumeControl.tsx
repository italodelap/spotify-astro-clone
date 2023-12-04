import { useRef } from "react";

import { useStore } from "@/store/useStore";

import { Slider, VolumeHighIcon, VolumeLowIcon, VolumeMediumIcon, VolumeSilenceIcon } from ".";

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
    <div className="flex justify-center gap-x-2 text-white">
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

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newVolume] = value;
          setVolume(newVolume / 100);
        }}
      />
    </div>
  );
}
