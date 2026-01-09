import SelectComponent from "./SelectComponent";
import ToggleComponent from "./ToggleComponent";

import soundList from '../SoundFiles.json';

import { usePreferenceStore } from "../stores/PreferenceStore";


const PreferencesPaneComponent = () => {

    console.log('preference store is ', usePreferenceStore)
    const {setVictorySound,setSpinnerSound,victorySound, spinnerSound} = usePreferenceStore(preferences => preferences);

    // default the sound prefs to the first sound in the list if none are set

  const handleVictorySoundChange = (e:any) => {
    e.preventDefault();
    // grab the value of the select
    const preference = e.target.value
    setVictorySound(preference);
  }
    const handleSpinnerSoundChange = (e:any) => {
        e.preventDefault();
        // grab the value of the select
        const preference = e.target.value
        setSpinnerSound(preference);
    }

  return (
      <div className="w-75 m-5 preferences-pane">
        <div className="preferences-popup">
          <SelectComponent
              inputName="Victory Sound"
              defaultValue="Please Select"
              options={soundList.victorySounds}
              handleSelectChange={handleVictorySoundChange}
              preferenceChoice={victorySound?? soundList.victorySounds[0].value}
          />
            <SelectComponent
                inputName="Spinner Sound"
                defaultValue="Please Select"
                options={soundList.spinnerSounds}
                handleSelectChange={handleSpinnerSoundChange}
                preferenceChoice={spinnerSound?? soundList.spinnerSounds[0].value}
            />
          <ToggleComponent label="Spin Sound"/>
        </div>
    </div>
  );
};

export default PreferencesPaneComponent;
