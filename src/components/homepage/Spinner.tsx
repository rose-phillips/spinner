import React, { useEffect, useState, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import type { Item } from "./Home";
const digitalSpin = require("../../assets/sounds/spinner-sound-36693.mp3");
const spinClicks = require("../../assets/sounds/spin-clicks.mp3")
const levelUpSound = require("../../assets/sounds/in-game-level-uptype-2-230567.mp3");


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
      spinClicksRef.current?.play();
    }, 1000);

  };

  const digitalSpinRef = useRef<HTMLAudioElement>(null);
  const spinClicksRef = useRef<HTMLAudioElement>(null);
  const levelUpSoundRef = useRef<HTMLAudioElement>(null);


  return (
    <div className="wheel-container mx-5">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={includeOnWheel.length > 0 ? includeOnWheel : tempList}
        onStopSpinning={() => {
          levelUpSoundRef.current?.play();
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
      <audio id="spin-sound-1" src={digitalSpin} ref={digitalSpinRef} />
      <audio id="celebrate-sound-1" src={levelUpSound} ref={levelUpSoundRef} />
      <audio id="spin-sound-2" src={spinClicks} ref={spinClicksRef}></audio>

    </div>
  );
};

export default Spinner;
