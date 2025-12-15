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
}
const SelectComponent = (props: SelectProps) => {

    const handleChange = () => {

    }
  return (
    <div>
        <label htmlFor={props.inputName}>{props.inputName} - </label>
      <select
        defaultValue={props.defaultValue}
        name={props.inputName}
        id={props.inputName}
        className="preferenceInput__select"
        onChange={props.handleSelectChange}
        >
            {/* {props.defaultValue ??
            <option key={props.defaultValue} value={props.defaultValue}>
                    {props.defaultValue}
                    </option>
            } */}
            {props.options.map((option) => {
                return (
                    <option key={option.value} value={option.value}>
                    {option.name}
                    </option>
                );
            })}
        </select>
    </div>
  );
};

export default SelectComponent;
