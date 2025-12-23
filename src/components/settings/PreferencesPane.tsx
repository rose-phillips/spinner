import SelectComponent from "./SelectComponent";
import ToggleComponent from "./ToggleComponent";

import {camelCase} from "../../common/helpers/strings";

import soundList from '../SoundFiles.json';

import { PreferenceStore, usePreferenceStore, Preferences } from "../stores/PreferenceStore";


const PreferencesPaneComponent = () => {

    console.log('preference store is ', usePreferenceStore)

    const victorySoundChoiceFromPreferences = usePreferenceStore((state: PreferenceStore) => (state.preferences.victorySound === undefined ? "/sounds/kirbys-victory-dance.mp3" : state.preferences.victorySound[0].value));

  const setPreferences = usePreferenceStore(
      (state: PreferenceStore) => state.setPreferences
    );



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
          <SelectComponent
              inputName="Victory Sound"
              defaultValue="Please Select"
              options={soundList.victorySounds}
              handleSelectChange={handleSelectChange}
              preferenceChoice={victorySoundChoiceFromPreferences}
          />
          <ToggleComponent label="Spin Sound"/>
        </div>
    </div>
  );
};

export default PreferencesPaneComponent;
