import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PreferenceStore {
  spinnerSound: string | undefined;
  victorySound: string | undefined;
  spinnerAutoplay: boolean;
  victorySoundAutoplay: boolean;
  confettiCount: number;
  setSpinnerSound: (newSound: string) => void;
  setVictorySound: (newSound: string) => void;
  setSpinnerAutoplay: (newSound: boolean) => void;
  setVictorySoundAutoplay: (newSound: boolean) => void;
  setConfettiCount: (newSound: number) => void;
}

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set) => ({
        spinnerSound: undefined,
        victorySound: undefined,
        spinnerAutoplay: false,
        victorySoundAutoplay: false,
        confettiCount: 1,
    setSpinnerSound: (spinnerSound) =>
        set({spinnerSound}),
    setVictorySound: (victorySound) =>
        set({victorySound}),
    setSpinnerAutoplay: (spinnerAutoplay) =>
        set({spinnerAutoplay}),
    setVictorySoundAutoplay: (victorySoundAutoplay) =>
        set({victorySoundAutoplay}),
      setConfettiCount: (confettiCount) =>
        set({confettiCount}),
    }),
    {
      name: "SpinnerApp.preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
