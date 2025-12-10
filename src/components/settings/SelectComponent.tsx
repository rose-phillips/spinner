type Option = {
  id: string,
  name: string,
  value: string,
}

type SelectProps = {
    defaultValue: string,
    options: Option[],
    handleSelectChange: ({}) => void
}
const SelectComponent = (props: SelectProps) => {

    const handleChange = () => {

    }
  return (
    <div>
      <select
        defaultValue={props.defaultValue}
        name="victory-sound-select"
        id="victory-sound-select"
        
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
