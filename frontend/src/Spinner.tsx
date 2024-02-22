import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import type { Item } from "./ListAndSpinner";

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
  const [spinButtonDisabled, setSpinButtonDisabled] = useState(false);
  const [includeOnWheel, setIncludeOnWheel] = useState<Item[]>([]);

  const tempList = [
    {
      option: "add people",
      style: { backgroundColor: "white", textColor: "black" },
    },
  ];
  useEffect(() => {
    setIncludeOnWheel(list.filter((item) => item.include === true));
  }, [list]);

  useEffect(() => {
    if (includeOnWheel.length < 2) {
      setSpinButtonDisabled(true);
    } else setSpinButtonDisabled(false);
  }, [includeOnWheel]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    setIsExploding(false);
    const newPrizeNumber = Math.floor(Math.random() * includeOnWheel.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  // useEffect(() => {
  //   setWinner(includeOnWheel[prizeNumber]);
  // }, [prizeNumber]);

  return (
    <div className="wheel-container mx-5">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={includeOnWheel.length > 0 ? includeOnWheel : tempList}
        onStopSpinning={() => {
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
      <button
        className="spin-button"
        onClick={handleSpinClick}
        disabled={spinButtonDisabled}
      >
        SPIN
      </button>
    </div>
  );
};

export default Spinner;
