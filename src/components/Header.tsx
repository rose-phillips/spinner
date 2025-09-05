import { Link } from "react-router-dom";
import SoundSelect from "./homepage/SoundSelect";

const Header = () => {
  return (
    <div>
      <header className="header">
        <Link to="/" className="link">
          <h1 className="mx-auto my-3">{"<StandUpSpinner/>"}</h1>
        </Link>
        <SoundSelect/>
      </header>
    </div>
  );
};

export default Header;
