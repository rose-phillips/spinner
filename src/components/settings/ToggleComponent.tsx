type ToggleProps = {
    label: string,
}
const ToggleComponent = (props: ToggleProps) => {
  return (
    <div className="toggle">
     <label className="switch">
      {props.label}
  <input type="checkbox" />
  <span className="slider"></span>
</label>
    </div>
  );
};

export default ToggleComponent;
