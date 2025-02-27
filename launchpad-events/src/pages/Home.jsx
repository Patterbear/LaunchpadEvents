import { useEffect, useState } from "react";
import { fetchEvents } from "../../api";
import EventList from "../components/EventList";
import Header from "../components/Header";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Header title="Launchpad Events" />
      <EventList events={events} />
    </div>
  );
};

export default Home;
