import React, { useRef, useState, useEffect } from "react";

const pokemonSound = require("../../assets/sounds/pokemon.mp3") as string;
const kirbySound =
  require("../../assets/sounds/kirbys-victory-dance.mp3") as string;
const ffixSound =
  require("../../assets/sounds/ffix-victory-fanfare-ringtone-download.mp3") as string;
const marioSound =
  require("../../assets/sounds/victory-mario-series-hq-super-smash-bros.mp3") as string;

export interface SoundsInfo {
  value: string;
  soundName: string;
  sound: string;
}

function SoundSelect() {
  const soundsList = [
    {
      value: "pokemonSound",
      soundName: "Pokemon team victory",
      sound: pokemonSound,
    },
    {
      value: "kirbySound",
      soundName: "Kirby's victory dance",
      sound: kirbySound,
    },
    { value: "ffixSound", soundName: "FFIX victory", sound: ffixSound },
    { value: "marioSound", soundName: "Mario victory", sound: marioSound },
  ];
  const [soundChoice, setSoundChoice] = useState<SoundsInfo>(() => {
    const saved = localStorage.getItem("SpinnerApp.victorySound");
    if (saved !== undefined) {
      return JSON.parse(saved!)
    } else {
      return soundsList[0]
    }
  });

  const soundRef = useRef<HTMLAudioElement>(null);

      useEffect(() => {
      localStorage.setItem("SpinnerApp.victorySound", JSON.stringify(soundChoice));
    }, [soundChoice]);


  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.volume = 1;
      soundRef.current.play();
    }
  };
  const handleSoundChange = (e: any) => {
    e.preventDefault();
    const chosenSound = soundsList.filter(
      (sound) => sound.value === e.target.value
    );
    setSoundChoice(chosenSound[0])
    setTimeout(() => {
      playSound();
    }, 1);
  };

  return (
    <div className="sound-select">
      <select
        name="victory-sound-select"
        id="victory-sound-select"
        onChange={(e) => handleSoundChange(e)}
      >
        <option value="">choose victory sound</option>
        {soundsList.map((sound) => {
          return (
            <option key={sound.value} value={sound.value}>
              {sound.soundName}
            </option>
          );
        })}
      </select>
      <audio
        id="victory-sound-choice"
        src={soundChoice?.sound}
        ref={soundRef}
      ></audio>
    </div>
  );
}

export default SoundSelect;
