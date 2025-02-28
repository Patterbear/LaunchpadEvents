import { useEffect, useState } from "react";
import { fetchEvents } from "../../api";
import EventList from "../components/EventList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = ({ query, location, sortBy }) => {
    let filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) &&
        (location === "All" || event.location === location)
    );

    filtered.sort((a, b) =>
      sortBy === "soonest"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    setFilteredEvents(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <EventList events={events} />
    </div>
  );
};

export default Home;
