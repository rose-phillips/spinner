type RangeProps = {
    label: string,
    name: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    preferenceChoice: number
}
const RangeComponent = (props: RangeProps) => {

    return (
        <div className="range-slider">
            <label className="input-label" htmlFor={props.name}>{props.label}</label>
            <input type="range" min="1" max="20" defaultValue={props.preferenceChoice} id={props.name} onChange={props.handleChange} />
            <div className="output">{props.preferenceChoice}</div>
        </div>
    );
};

export default RangeComponent;
