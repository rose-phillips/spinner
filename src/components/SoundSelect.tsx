import  { useRef } from "react";
import { soundsList, useSoundStore, SoundStore } from "./stores/SoundStore";

function SoundSelect() {

  const soundChoice = useSoundStore((state: SoundStore) => state.soundChoice);
  const setSoundChoice = useSoundStore((state: SoundStore) => state.setSoundChoice)
  const soundRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.volume = 0.15;
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
    <div className="sound-select-container">
      <label htmlFor="victory-sound-select">Victory sound:</label>
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
      <audio
        id="victory-sound-choice"
        src={soundChoice?.sound}
        ref={soundRef}
      ></audio>
    </div>
  );
}

export default SoundSelect;
