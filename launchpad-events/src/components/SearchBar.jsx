import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";

const Header = ({ onSearch }) => {
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
      <form className="header-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="All">All Locations</option>
          <option value="Burton Latimer">Burton Latimer</option>
          <option value="Kettering">Kettering</option>
          <option value="Finedon">Finedon</option>
          <option value="Corby">Corby</option>
          <option value="Leicester">Leicester</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="soonest">Soonest</option>
          <option value="latest">Latest</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
