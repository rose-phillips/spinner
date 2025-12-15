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

    function camelCase(str:string) {
        // Using replace method with regEx
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index == 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

  const handleSelectChange = (e:any) => {
    e.preventDefault();
    // grab the value of the select
    const preference = e.target.value
      // create a normalised keyname with the select field name
    const keyName = camelCase(e.target.name)
    setPreferences({[keyName]: [{value: preference}]});
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
