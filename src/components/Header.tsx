import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="header">
        <Link to="/" className="link">
          <h1 className="mx-auto my-3">{"<StandUpSpinner/>"}</h1>
        </Link>
      </header>
    </div>
  );
};

export default Header;
