import {PlayButton} from "./PlayButton";

type Option = {
  id: string,
  name: string,
  value: string,
}

type SelectProps = {
    defaultValue: string,
    inputName: string,
    options: Option[],
    handleSelectChange: ({}) => void
    preferenceChoice: string
}
const SelectComponent = (props: SelectProps) => {


    const handleChange = () => {

    }

    console.log("Select comp - current pref is ",props.preferenceChoice);
  return (
    <div>
        <label htmlFor={props.inputName}>{props.inputName} - </label>
      <select
        defaultValue={props.preferenceChoice}
        name={props.inputName}
        id={props.inputName}
        className="preferenceInput__select"
        onChange={props.handleSelectChange}
        >
            {props.options.map((option) => {
                return (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                    {option.name}
                    </option>
                );
            })}
        </select>

        <PlayButton soundType={props.inputName} currentSoundFromPref={props.preferenceChoice} />
    </div>
  );
};

export default SelectComponent;
