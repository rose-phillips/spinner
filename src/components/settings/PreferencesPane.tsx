import SelectComponent from "./SelectComponent";
import ToggleComponent from "./ToggleComponent";

import { camelCase } from "../../common/helpers/strings";

import soundList from '../SoundFiles.json';

import { PreferenceStore, usePreferenceStore, Preferences } from '../stores/PreferenceStore';


const PreferencesPaneComponent = () => {

  const victorySoundChoiceFromPreferences = usePreferenceStore((state: PreferenceStore) => (state.preferences.victorySound === undefined ? "/sounds/kirbys-victory-dance.mp3" : state.preferences.victorySound[0].value));

  const setPreferences = usePreferenceStore(
    (state: PreferenceStore) => state.setPreferences
  );

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

  const handleSelectChange = (e: any) => {
    e.preventDefault();
    // grab the value of the select
    const preference = e.target.value
    // create a normalised keyname with the select field name
    const keyName = camelCase(e.target.name)
    setPreferences({ [keyName]: [{ value: preference }] });
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
              handleSelectChange={handleSelectChange}
              preferenceChoice={victorySoundChoiceFromPreferences}
            />
            <ToggleComponent label="Spin Sound" />
          </div>
      </dialog>
    </>
  );
};

export default PreferencesPaneComponent;
