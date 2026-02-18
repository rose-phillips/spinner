import React, {useRef, useState} from "react";
import {PreferenceStore, usePreferenceStore} from "../stores/PreferenceStore";
import {camelCase} from "../../common/helpers/strings";

interface IPlaybuttonProps {
    soundType: string,
    currentSoundFromPref: string
}

export const PlayButton: React.FC<IPlaybuttonProps> = ({
    soundType,
    currentSoundFromPref
}) => {
    soundType = camelCase(soundType);

    const soundChoice = usePreferenceStore((state: PreferenceStore) => currentSoundFromPref);
    const soundRef = useRef<HTMLAudioElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = () => {
        const audio = soundRef.current;
        if (!audio) return;

        audio.load();

        if (audio.paused) {
            audio.volume = 0.15;
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        }

        audio.onended = () => setIsPlaying(false);
    };

    return (
        <>
            <button
                className="play-button"
                onClick={playSound}
                aria-label={isPlaying ? "Stop" : "Play"}
            >
                {isPlaying ? "⏹" : "▶"}
            </button>

            <audio
                id={"victorySound-choice"}
                src={soundChoice}
                ref={soundRef}
                preload={"auto"}
            ></audio>
        </>
    );
};