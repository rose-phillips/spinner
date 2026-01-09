import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PreferenceStore {
  spinnerSound: string | undefined;
  victorySound: string | undefined;
  setSpinnerSound: (newSound: string) => void;
  setVictorySound: (newSound: string) => void;
}

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set) => ({
        spinnerSound: undefined,
        victorySound: undefined,
    setSpinnerSound: (spinnerSound) =>
        set({spinnerSound}),
    setVictorySound: (victorySound) =>
        set({victorySound}),
    }),
    {
      name: "SpinnerApp.preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
