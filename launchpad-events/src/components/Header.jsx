import { Link } from "react-router-dom";
import banner from "../assets/banner.png";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={banner} alt="Launchpad Events" className="header-banner" />
      </Link>
    </header>
  );
};

export default Header;
