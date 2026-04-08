import ColorSwatch from "./ColorSwatch";
import {PlayButton} from "./PlayButton";

type Option = {
	id: string,
	name: string,
	value: string,
	timeout?: number,
}

type SelectProps = {
	defaultValue: string,
	inputName: string,
	options: Option[],
	handleSelectChange: (option: Option) => void
	preferenceChoice: string,
	preferenceType: "sound" | "color",
	colorCount?: "1" | "multi" | undefined
}

const SelectComponent = (props: SelectProps) => {
	const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const selectedOption = props.options.find((o) => o.value === selectedValue);
		if (selectedOption) props.handleSelectChange(selectedOption);
	};

	return (
		
		<div>
			<label className="input-label" htmlFor={props.inputName}>{props.inputName}</label>
			<br />
			<div className="select-container">
			<select
				defaultValue={props.preferenceChoice}
				name={props.inputName}
				id={props.inputName}
				className="preferenceInput__select"
				onChange={onSelectChange}
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
			<div>
			{
				props.preferenceType === "color" ? 
					<ColorSwatch colorCount={props.colorCount} /> :
					<PlayButton soundType={props.inputName} currentSoundFromPref={props.preferenceChoice} />
			}
			</div>
		</div>


		</div>
	);
};

export default SelectComponent;