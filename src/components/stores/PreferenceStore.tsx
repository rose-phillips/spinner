import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import soundList from '../SoundFiles.json';

// const pokemonSound = require("../../assets/sounds/pokemon.mp3") as string;
// const kirbySound =
//   require("../../assets/sounds/kirbys-victory-dance.mp3") as string;
// const ffixSound =
//   require("../../assets/sounds/ffix-victory-fanfare-ringtone-download.mp3") as string;
// const marioSound =
//   require("../../assets/sounds/victory-mario-series-hq-super-smash-bros.mp3") as string;

export interface Preferences {
  name: string;
  value: string;
}

export interface PreferenceStore {
  preferences: Preferences[];
  setPreferences: (newPreferences: Preferences[]) => void;
}

const initialPreferences = [
   { name: "string",
  value: "string",},
     { name: "string",
  value: "string",}]

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set) => ({
      preferences: initialPreferences,
      setPreferences: (newPreferences) =>
        set(() => ({ preferences: newPreferences })),
    }),
    {
      name: "SpinnerApp.preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
