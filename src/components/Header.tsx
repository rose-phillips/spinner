import { Link } from "react-router-dom";
import SoundSelect from "./SoundSelect";
import ThemeSelect from "./ThemeSelect";

const Header = () => {
  return (
    <div>
      <header className="header">
        <Link to="/" className="link">
          <h1 className="mx-auto my-3">{"<StandUpSpinner/>"}</h1>
        </Link>
        <SoundSelect/>
        <ThemeSelect />
      </header>
    </div>
  );
};

export default Header;
