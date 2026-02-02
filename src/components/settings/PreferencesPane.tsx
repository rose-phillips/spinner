import SelectComponent from "./SelectComponent";
import ToggleComponent from "./ToggleComponent";

import soundList from '../SoundFiles.json';

import { usePreferenceStore } from "../stores/PreferenceStore";
import RangeComponent from "./RangeComponent";


const PreferencesPaneComponent = () => {

    console.log('preference store is ', usePreferenceStore)
    const {
        setVictorySound,
        setSpinnerSound,
        setSpinnerAutoplay,
        setVictorySoundAutoplay,
        setConfettiCount,
        victorySound,
        spinnerSound,
        spinnerAutoplay,
        victorySoundAutoplay,
        confettiCount
    } = usePreferenceStore(preferences => preferences);

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
    const handleSpinnerAutoplayChange = (e:any) => {
        e.preventDefault();
        // grab the value of the select
        const preference = e.target.checked
        setSpinnerAutoplay(preference);
    }
    const handleVictorySoundAutoplayChange = (e:any) => {
        e.preventDefault();
        // grab the value of the select
        const preference = e.target.checked
        setVictorySoundAutoplay(preference);
    }
    const handleConfettiCountChange = (e:any) => {
        e.preventDefault();
        // grab the value of the select
        const preference = Number(e.target.value)
        setConfettiCount(preference);
    }

    const modal = document.querySelector('dialog');
    const openPreferencesModal = (e: any) => {
        e.preventDefault();
        modal && modal.showModal();

    }

    const closePreferencesModal = (e: any) => {
        // e.preventDefault();
        if (e.target === modal) {
            modal && modal.close();
        }
    }

  return (
    <>
      <button onClick={e => openPreferencesModal(e)}>
        Open Preferences
      </button>
      <dialog onClick={e => closePreferencesModal(e)} >
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
            <ToggleComponent label="Auto play spin Sound" name="spinnerSoundToggle" handleChange={handleSpinnerAutoplayChange} preferenceChoice={spinnerAutoplay?? false}/>
            <ToggleComponent label="Auto play victory Sound" name="victorySoundToggle" handleChange={handleVictorySoundAutoplayChange} preferenceChoice={victorySoundAutoplay?? false}/>
            <RangeComponent label="Confetti Count" name="confettiCounter" handleChange={handleConfettiCountChange} preferenceChoice={confettiCount ?? 1} />
        </div>
        </dialog>
    </>
  );
};

export default PreferencesPaneComponent;
