import {PreferenceStore} from "../../components/stores/PreferenceStore";
import soundList from "../../components/SoundFiles.json";

/**
 * Generates a set number of random hex values and returns each one as a collective array
 *
 * @param length - The total number of colours to generate
 * @returns Returns an array of colours.
 *
 */
export const randomHexColorCode = (length: number = 3) => {
    let returnHexes = [];
    for (let i = 1; i <= length; i++) {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        returnHexes.push('#' + n.slice(0, 6))
    }
    return returnHexes;
};


/**
 * Checks local storage to see if there are any preferences set and if not, sets some defaults
 * useful for first time setups
 *
 */

export const bootstrapLocalStorage = (PreferencesStore: PreferenceStore) => {
    if(PreferencesStore.spinnerSound === undefined && PreferencesStore.victorySound === undefined) {
        // set a default sound if none is set
        PreferencesStore.setSpinnerSound({value: soundList.spinnerSounds[0].value, timeout: soundList.spinnerSounds[0].timeout}) // clicker
        PreferencesStore.setVictorySound(soundList.victorySounds[0].value) // kirby
        PreferencesStore.setSpinnerAutoplay(true)
        PreferencesStore.setVictorySoundAutoplay(true)
    }
}