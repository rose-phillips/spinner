import React, { useEffect, useState, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import type { Item } from "./Home";
import { SoundStore, useSoundStore } from "../stores/SoundStore";
const spinClicks = require("../../assets/sounds/spin-clicks.mp3");

const Spinner = ({
  list,
  setOpen,
  winner,
  setWinner,
  setIsExploding,
}: {
  list: Item[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  winner: Item;
  setWinner: React.Dispatch<React.SetStateAction<Item>>;
  setIsExploding: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // gets the sound choice from the sound store
  const soundChoice = useSoundStore((state: SoundStore) => state.soundChoice);
  // states for the wheel
  const [includeOnWheel, setIncludeOnWheel] = useState<Item[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  // a placeholder for the items on the wheel
  const tempList = [
    {
      option: "add people",
      style: { backgroundColor: "white", textColor: "black" },
    },
  ];
  // checks if an item is ticked or not
  useEffect(() => {
    setIncludeOnWheel(list.filter((item) => item.include === true));
  }, [list]);
  // 
  const handleSpinClick = () => {
    // reset confetti
    setIsExploding(false);
    // select random item index
    const newPrizeNumber = Math.floor(Math.random() * includeOnWheel.length);
    setPrizeNumber(newPrizeNumber);
    // the wheel must spin. it has been foretold.
    setMustSpin(true);
    // play sound after a bit
    setTimeout(() => {
      playSound(spinClicksRef);
    }, 1000);
  };

  const spinClicksRef = useRef<HTMLAudioElement>(null);
  const victorySoundRef = useRef<HTMLAudioElement>(null);

  const playSound = (sound: React.RefObject<HTMLAudioElement>) => {
    if (sound.current) {
      // lowers the volume
      sound.current.volume = 0.15;
      sound.current.play();
    }
  };
  //

  return (
    <div className="wheel-container mx-5">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={includeOnWheel.length > 0 ? includeOnWheel : tempList}
        onStopSpinning={() => {
          playSound(victorySoundRef);
          setWinner(includeOnWheel[prizeNumber]);
          setMustSpin(false);
          setOpen(true);
          setIsExploding(true);
        }}
        backgroundColors={["lightgrey", "grey", "darkgrey"]}
        outerBorderWidth={0}
        innerBorderColor="black"
        innerBorderWidth={50}
        radiusLineColor="black"
        radiusLineWidth={2}
        fontFamily="Roboto Mono"
        fontWeight={200}
        spinDuration={0.4}
      />
      <button className="spin-button" onClick={handleSpinClick}>
        SPIN
      </button>
      <audio id="victory-sound" src={soundChoice.sound} ref={victorySoundRef} />
      <audio id="spin-sound-2" src={spinClicks} ref={spinClicksRef}></audio>
    </div>
  );
};

export default Spinner;
