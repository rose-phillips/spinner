import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Preferences {
  name: string;
  value: string;
}

export interface PreferenceStore {
  preferences:  { [key: string]: any };
  setPreferences: (newPreferences: { [key: string]: any }) => void;
}

const initialPreferences =[
    "preference", { value: "string",}
]

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set) => ({
      preferences: initialPreferences,
      setPreferences: (newPreferences) =>
        set({ preferences: newPreferences }),
    }),
    {
      name: "SpinnerApp.preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
