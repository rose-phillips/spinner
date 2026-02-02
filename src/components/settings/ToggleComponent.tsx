type ToggleProps = {
    label: string,
    name: string,
    handleChange: ({}) => void
    preferenceChoice: boolean
}
const ToggleComponent = (props: ToggleProps) => {
  return (
    <div className="toggle">
        <label htmlFor={props.name}>{props.label}</label>
        <input key={Math.random()} type="checkbox" id={props.name} onChange={props.handleChange} checked={props.preferenceChoice}/>

        {/* <span className="switch">*/}
        {/*     <span className="slider"></span>*/}
        {/*</span>*/}
    </div>
  );
};

export default ToggleComponent;
