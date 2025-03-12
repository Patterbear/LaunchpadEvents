import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";

const Header = ({ profile, logOut, logIn }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src={banner}
        alt="Launchpad Events"
        className="header-banner"
        onClick={() => navigate("/events")}
      />
      <div className="header-right">
        {profile ? (
          <button id="create-event-button">Create Event ➕</button>
        ) : (
          <></>
        )}
        {profile ? (
          <img id="profile-img" src={profile.picture} alt="User Profile" />
        ) : (
          <button onClick={logIn} id="login-button">
            Sign in with Google 🚀
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
