import React, { useEffect, useState, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import type { Item } from "./Home";
import {usePreferenceStore} from "../stores/PreferenceStore";

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

	const {victorySound, spinnerSound, spinnerAutoplay, victorySoundAutoplay} = usePreferenceStore(preferences => preferences);

	const spinnerSoundRef = useRef<HTMLAudioElement>(null);
	const victorySoundRef = useRef<HTMLAudioElement>(null);

	const playSound = (sound: React.RefObject<HTMLAudioElement>, autoplay:boolean) => {
		if (sound.current) {
			if (autoplay) {
				sound.current.volume = 0.45;
				sound.current.play();
			}
		}
	};

	const handleSpinClick = () => {
		setIsExploding(false);
		const newPrizeNumber = Math.floor(Math.random() * includeOnWheel.length);
		setPrizeNumber(newPrizeNumber);
		setMustSpin(true);

		const delayMs = spinnerSound?.timeout ?? 10;
		setTimeout(() => {
			playSound(spinnerSoundRef, spinnerAutoplay);
		}, delayMs);
	};

	return (
		<div className="wheel-container mx-5">
			<Wheel
				mustStartSpinning={mustSpin}
				prizeNumber={prizeNumber}
				data={includeOnWheel.length > 0 ? includeOnWheel : tempList}
				onStopSpinning={() => {
					playSound(victorySoundRef,victorySoundAutoplay);
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
				disableInitialAnimation={true}
				spinDuration={spinnerSound?.duration ?? 0.36}
			/>
			<button className="spin-button" onClick={handleSpinClick}>
				SPIN
			</button>
			<audio
				id={"victorySound-choice"}
				src={victorySound}
				ref={victorySoundRef}
				preload={"auto"}
			></audio>
			<audio
				id={"spinnerSound-choice"}
				src={spinnerSound?.value}
				ref={spinnerSoundRef}
				preload={"auto"}
			></audio>
		</div>
	);
};

export default Spinner;