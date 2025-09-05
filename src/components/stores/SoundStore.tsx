import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

export interface SoundStore {
  soundChoice: SoundsInfo;
  setSoundChoice: (newChoice: SoundsInfo) => void;
}

export const soundsList: SoundsInfo[] = [
  { value: "pokemonSound", soundName: "Pokemon", sound: pokemonSound },
  { value: "kirbySound", soundName: "Kirby", sound: kirbySound },
  { value: "ffixSound", soundName: "FFIX", sound: ffixSound },
  { value: "marioSound", soundName: "Mario", sound: marioSound },
];

export const useSoundStore = create<SoundStore>()(
  persist(
    (set) => ({
      soundChoice: soundsList[0],
      setSoundChoice: (newChoice) =>
        set(() => ({ soundChoice: newChoice })),
    }),
    {
      name: "SpinnerApp.victory-sound",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
