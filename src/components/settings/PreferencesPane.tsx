import SelectComponent from "./SelectComponent";
import ToggleComponent from "./ToggleComponent";

import soundList from "../SoundFiles.json";

import { usePreferenceStore } from "../stores/PreferenceStore";
import RangeComponent from "./RangeComponent";

import { useRef } from "react";


const PreferencesPaneComponent = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  console.log("preference store is ", usePreferenceStore);
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
    confettiCount,
  } = usePreferenceStore((preferences) => preferences);

  // default the sound prefs to the first sound in the list if none are set

  const handleVictorySoundChange = (option: any) => {
    setVictorySound(option.value);
  };

  const handleSpinnerSoundChange = (option: any) => {
    setSpinnerSound({
      value: option.value,
      timeout: option.timeout,
      duration: option.duration,
    });
  };

  const handleSpinnerAutoplayChange = (e: any) => {
    e.preventDefault();
    // grab the value of the select
    const preference = e.target.checked;
    setSpinnerAutoplay(preference);
  };
  const handleVictorySoundAutoplayChange = (e: any) => {
    e.preventDefault();
    // grab the value of the select
    const preference = e.target.checked;
    setVictorySoundAutoplay(preference);
  };
  const handleConfettiCountChange = (e: any) => {
    e.preventDefault();
    // grab the value of the select
    const preference = Number(e.target.value);
    setConfettiCount(preference);
  };

  const openPreferencesModal = (e: any) => {
    e.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closePreferencesModal = (e: any) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <button
        onClick={(e) => openPreferencesModal(e)}
        className="preferences-button"
      >
        <i className="fa-solid fa-sliders"></i> Preferences
      </button>
      <dialog onClick={(e) => closePreferencesModal(e)} ref={dialogRef}>
        <div className="preferences-popup">
          <div className="sounds-container">
            <div className="sounds-inner-container">
              <SelectComponent
                inputName="Spinner Sound"
                defaultValue="Please Select"
                options={soundList.spinnerSounds}
                handleSelectChange={handleSpinnerSoundChange}
                preferenceChoice={
                  spinnerSound?.value ?? soundList.spinnerSounds[0].value
                }
              />
              <ToggleComponent
                label="Auto play"
                name="spinnerSoundToggle"
                handleChange={handleSpinnerAutoplayChange}
                preferenceChoice={spinnerAutoplay ?? false}
              />
            </div>
            <div className="sounds-inner-container">
              <SelectComponent
                inputName="Victory Sound"
                defaultValue="Please Select"
                options={soundList.victorySounds}
                handleSelectChange={handleVictorySoundChange}
                preferenceChoice={
                  victorySound ?? soundList.victorySounds[0].value
                }
              />

              <ToggleComponent
                label="Auto play"
                name="victorySoundToggle"
                handleChange={handleVictorySoundAutoplayChange}
                preferenceChoice={victorySoundAutoplay ?? false}
              />
            </div>
          </div>
          <div>
            <RangeComponent
              label="Confetti Colours"
              name="confettiCounter"
              handleChange={handleConfettiCountChange}
              preferenceChoice={confettiCount ?? 1}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PreferencesPaneComponent;
