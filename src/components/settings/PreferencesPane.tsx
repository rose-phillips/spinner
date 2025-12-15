import SelectComponent from "./SelectComponent";
import ToggleComponent from "./ToggleComponent";

import { PreferenceStore, usePreferenceStore, Preferences } from "../stores/PreferenceStore";


const PreferencesPaneComponent = () => {

    const soundsList = [
    { value: "pokemonSound", name: "Pokemon", id: "Pokemon" },
    { value: "kirbySound", name: "Kirby", id: "kirbySound" },
    { value: "ffixSound", name: "FFIX", id: "ffixSound" },
    { value: "marioSound", name: "Mario", id: "marioSound" },
  ];

  const setPreferences = usePreferenceStore(
      (state: PreferenceStore) => state.setPreferences
    );

  const handleSelectChange = (e:any) => {
    e.preventDefault();
    const preference = e.target.value
    setPreferences(preference[0]);
  }

  return (
      <div className="w-75 m-5 preferences-pane">
        <div className="preferences-popup">
          <SelectComponent inputName="Victory Sound" defaultValue="Please Select" options={soundsList} handleSelectChange={handleSelectChange} />
          <ToggleComponent label="Spin Sound"/>
        </div>
    </div>
  );
};

export default PreferencesPaneComponent;
