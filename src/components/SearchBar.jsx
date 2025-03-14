import { useState } from "react";

const SearchBar = ({
  onSearch,
  locations,
  selectedLocation,
  selectedSortBy,
}) => {
  const [location, setLocation] = useState(selectedLocation);
  const [sort_by, setSortBy] = useState(selectedSortBy);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, sort_by });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        {locations.map((loc, index) => (
          <option key={index} value={loc}>
            {loc}
          </option>
        ))}
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
