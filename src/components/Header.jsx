import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";

const Header = ({ profile, logOut }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className="header">
      <img
        src={banner}
        alt="Launchpad Events"
        className="header-banner"
        onClick={() => navigate("/events")}
      />
      <section className="header-right">
        {profile?.role === "admin" && (
          <button
            className="create-event-button"
            onClick={() => navigate("/create-event")}
          >
            Create Event ➕
          </button>
        )}

        {profile ? (
          <section className="profile-container" onMouseLeave={closeMenu}>
            <img
              className="profile-img"
              src={profile.picture}
              alt="User Profile"
              onMouseEnter={openMenu}
            />

            {showMenu && (
              <section className="profile-menu">
                <button onClick={() => navigate("/my-events")}>
                  My Events
                </button>
                <button onClick={() => {
                  logOut();
                  navigate("/");
                }}>Log Out</button>
              </section>
            )}
          </section>
        ) : (
          <button onClick={() => navigate("/login")} id="login-button">
            Sign in
          </button>
        )}
      </section>
    </header>
  );
};

export default Header;
