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


    const [play, setPlay] = useState("▶");

    const playSound = () => {
        if (soundRef.current) {
            if (soundRef.current.paused) {
                soundRef.current.volume = 0.15;
                soundRef.current.play();
                setPlay("⏹");
            } else {
                soundRef.current.pause();
                soundRef.current.currentTime = 0;
                setPlay("▶");
            }
        }
    };
    return (
        <>
        <button className="play-button" onClick={playSound}>{play}</button>
        <audio
            id={"victorySound-choice"}
            src={soundChoice}
            ref={soundRef}
        ></audio>
        </>
    );
};