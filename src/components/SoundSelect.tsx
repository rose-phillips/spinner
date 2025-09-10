import { useRef, useState } from "react";
import { soundsList, useSoundStore, SoundStore } from "./stores/SoundStore";

function SoundSelect() {
  const soundChoice = useSoundStore((state: SoundStore) => state.soundChoice);
  const setSoundChoice = useSoundStore(
    (state: SoundStore) => state.setSoundChoice
  );
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
  const handleSoundChange = (e: any) => {
    e.preventDefault();
    const chosenSound = soundsList.filter(
      (sound) => sound.value === e.target.value
    );
    setSoundChoice(chosenSound[0]);
  };

  return (
    <div className="sound-select-container">
      <label htmlFor="victory-sound-select">Victory sound:</label>
      <div>
        <select
          defaultValue={soundChoice.value}
          name="victory-sound-select"
          id="victory-sound-select"
          onChange={(e) => handleSoundChange(e)}
        >
          {soundsList.map((sound) => {
            return (
              <option key={sound.value} value={sound.value}>
                {sound.soundName}
              </option>
            );
          })}
        </select>
        <button className="play-button" type="button" onClick={playSound}>
          {play}
        </button>
      </div>

      <audio
        id="victory-sound-choice"
        src={soundChoice?.sound}
        ref={soundRef}
      ></audio>
    </div>
  );
}

export default SoundSelect;
