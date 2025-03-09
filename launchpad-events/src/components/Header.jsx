import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";

const Header = ({ onSearch, profile, logOut, logIn }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All");
  const [sortBy, setSortBy] = useState("soonest");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, location, sortBy });
  };

  return (
    <header className="header">
      <img
        src={banner}
        alt="Launchpad Events"
        className="header-banner"
        onClick={() => navigate("/")}
      />
      {profile ? (
        <img id="profile-img" src={profile.picture} alt="User Profile" />
      ) : (
        <button onClick={logIn} id="login-button">
          Sign in with Google 🚀
        </button>
      )}
    </header>
  );
};

export default Header;
