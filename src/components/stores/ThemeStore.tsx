import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import bubblegum from "../../styles-bubblegum.module.scss";
import dark from "../../styles-dark.module.scss";

export interface ThemeState {
  theme: string;
  light: string;
  medium: string;
  dark: string;
  setTheme: (themeChoice: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "",
      light: "",
      medium: "",
      dark: "",
      setTheme: (themeChoice) => {
        if (themeChoice === "bubblegum") {
          set(() => ({
            theme: themeChoice,
            light: bubblegum.light,
            medium: bubblegum.medium,
            dark: bubblegum.dark,
          }));
        } else if (themeChoice === "dark") {
          set(() => ({
            theme: themeChoice,
            light: dark.light,
            medium: dark.medium,
            dark: dark.dark,
          }));
        }
      },
    }),
    {
      name: "SpinnerApp.theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
