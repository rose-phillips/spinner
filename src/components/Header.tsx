import { Link } from "react-router-dom";
import PreferencesPaneComponent from "./settings/PreferencesPane";
import {usePreferenceStore} from "./stores/PreferenceStore"
import {bootstrapLocalStorage} from "../common/helpers/general";

const Header = () => {
  	// check to see if there are any sounds set in the preferences
	// if not, set some defaults
	bootstrapLocalStorage(usePreferenceStore());
  return (
    <div>
      <header className="header">
        <Link to="/" className="link">
          <h1 className="mx-auto my-3">{"<StandUpSpinner/>"}</h1>
        </Link>

            <PreferencesPaneComponent />

      </header>
    </div>
  );
};

export default Header;
