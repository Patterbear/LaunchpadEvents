import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.event_id}`} className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <img src={event.image} alt={`${event.title} event`} />
      <p className="event-location">{event.location}</p>
      <p className="event-date">
        {new Date(event.date).toLocaleDateString("en-GB")} @
        {event.time.split(":").slice(0, 2).join(":")}
      </p>
    </Link>
  );
};

export default EventCard;
