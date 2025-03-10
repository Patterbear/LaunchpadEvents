import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("All");
  const [sort_by, setSortBy] = useState("soonest");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, sort_by });
  };

  return (
    <form className="header-search" onSubmit={handleSubmit}>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="All">All Locations</option>
        <option value="Burton Latimer">Burton Latimer</option>
        <option value="Kettering">Kettering</option>
        <option value="Finedon">Finedon</option>
        <option value="Corby">Corby</option>
        <option value="Leicester">Leicester</option>
      </select>
      <select value={sort_by} onChange={(e) => setSortBy(e.target.value)}>
        <option value="soonest">Soonest</option>
        <option value="latest">Latest</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
