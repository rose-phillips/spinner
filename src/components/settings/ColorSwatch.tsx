import {usePreferenceStore} from "../stores/PreferenceStore";

const ColorSwatch = ({colorCount}:{colorCount: "1" | "multi" | undefined}) => {

  const {spinnerTheme} = usePreferenceStore(preferences => preferences);

return (
  <div className="d-flex"> 
    {colorCount === "multi" ?
    spinnerTheme?.themeColors.map((color) => {
     return <div className='color-swatch' style={{backgroundColor: `${color}`}}></div>
    }) 
  : <div className='color-swatch'></div>
  } 
  </div>
)
}

export default ColorSwatch