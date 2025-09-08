import { useThemeStore, ThemeState } from "./stores/ThemeStore";

function ThemeSelect() {
  const themeChoice = useThemeStore((state: ThemeState) => state.theme);
  const setThemeChoice = useThemeStore((state: ThemeState) => state.setTheme);

  const handleThemeChange = (e: any) => {
    setThemeChoice(e.target.value)
  };

  return (
    <div className="sound-select-container">
      <label htmlFor="theme-select">Theme:</label>
      <select
        value={themeChoice}
        name="theme-select"
        id="theme-select"
        onChange={(e) => handleThemeChange(e)}
      >
        <option key="dark" value="dark">Dark</option>
        <option key="bubblegum" value="bubblegum">Bubblegum</option>
      </select>
    </div>
  );
}

export default ThemeSelect;
