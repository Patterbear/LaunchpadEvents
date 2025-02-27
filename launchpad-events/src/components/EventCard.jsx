import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.event_id}`} className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <img src={event.image} alt={`${event.title} event`} />
      <p className="event-location">{event.location}</p>
      <p className="event-date">
        {new Date(event.date).toLocaleDateString("en-GB")} @
        {new Date(event.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <button className="event-button">View</button>
    </Link>
  );
};

export default EventCard;
