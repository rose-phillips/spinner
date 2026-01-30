type RangeProps = {
    label: string,
    name: string,
    handleChange: ({}) => void
    preferenceChoice: number
}
const RangeComponent = (props: RangeProps) => {

    return (
        <div className="rangeSlider">
            <label htmlFor={props.name}>{props.label} - {props.preferenceChoice}</label>
            <input type="range" min="1" max="20" defaultValue={props.preferenceChoice} id={props.name} onChange={props.handleChange} />
        </div>
    );
};

export default RangeComponent;
