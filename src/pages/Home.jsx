import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchEvents } from "../../api";
import EventList from "../components/EventList";
import SearchBar from "../components/SearchBar";
import LoadingImage from "../assets/loading.gif";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState(["All Locations"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("location") || !searchParams.get("sort_by")) {
      setSearchParams(
        { location: "All Locations", sort_by: "soonest" },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  const location = searchParams.get("location") || "All Locations";
  const sort_by = searchParams.get("sort_by") || "soonest";

  useEffect(() => {
    setIsLoading(true);
    fetchEvents(sort_by, location)
      .then((responseEvents) => {
        setEvents(responseEvents);
        setError(null);

        if (location === "All Locations") {
          const uniqueLocations = [
            "All Locations",
            ...new Set(responseEvents.map((event) => event.location)),
          ];
          setAllLocations(uniqueLocations);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sort_by, location]);

  const handleSearch = useCallback(
    ({ location, sort_by }) => {
      setSearchParams({ location, sort_by });
    },
    [setSearchParams]
  );

  if (isLoading) {
    return <img src={LoadingImage} alt="Loading..." />;
  }

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  return (
    <div id="home-page">
      <SearchBar
        onSearch={handleSearch}
        locations={allLocations}
        selectedLocation={location}
        selectedSortBy={sort_by}
      />
      <EventList events={events} />
    </div>
  );
};

export default Home;
