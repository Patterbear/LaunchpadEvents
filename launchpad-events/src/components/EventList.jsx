import { useState, useEffect } from "react";
import { fetchEvents } from "../../api";
import EventCard from "./EventCard";
import loadingGif from "../assets/loading.gif";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then((fetchedEvents) => {
        setEvents(fetchedEvents);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
