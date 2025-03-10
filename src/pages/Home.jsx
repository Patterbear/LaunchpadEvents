import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchEvents } from "../../api";
import EventList from "../components/EventList";
import SearchBar from "../components/SearchBar";
import LoadingImage from "../assets/loading.gif";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location") || "All";
  const sort_by = searchParams.get("sort_by") || "soonest";

  useEffect(() => {
    fetchEvents(sort_by, location)
      .then((responseEvents) => {
        setEvents(responseEvents);
        console.log(responseEvents);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [sort_by, location]);

  const handleSearch = useCallback(
    ({ location, sort_by }) => {
      setSearchParams({ location, sort_by });
    },
    [setSearchParams]
  );

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  if (isLoading) {
    return <img src={LoadingImage} alt="Loading..." />;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <EventList events={events} />
    </div>
  );
};

export default Home;
