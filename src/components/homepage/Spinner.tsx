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
  //
  const soundChoice = useSoundStore((state: SoundStore) => state.soundChoice);
  //
  const [includeOnWheel, setIncludeOnWheel] = useState<Item[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  //
  const tempList = [
    {
      option: "add people",
      style: { backgroundColor: "white", textColor: "black" },
    },
  ];
  //
  useEffect(() => {
    setIncludeOnWheel(list.filter((item) => item.include === true));
  }, [list]);
  //
  const handleSpinClick = () => {
    setIsExploding(false);
    const newPrizeNumber = Math.floor(Math.random() * includeOnWheel.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setTimeout(() => {
      playSound(spinClicksRef);
    }, 10);
  };

  const spinClicksRef = useRef<HTMLAudioElement>(null);
  const levelUpSoundRef = useRef<HTMLAudioElement>(null);

  const playSound = (sound: React.RefObject<HTMLAudioElement>) => {
    if (sound.current) {
      sound.current.volume = 0.45;
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
          playSound(levelUpSoundRef);
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
        spinDuration={0.36}
      />
      <button className="spin-button" onClick={handleSpinClick}>
        SPIN
      </button>
      {/*<audio id="victory-sound" src={soundChoice.sound} ref={levelUpSoundRef} />*/}
      {/*<audio id="spin-sound-2" src={spinClicks} ref={spinClicksRef}></audio>*/}
    </div>
  );
};

export default Spinner;
