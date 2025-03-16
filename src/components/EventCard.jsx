import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {

  const navigate = useNavigate();

  return (
    <figure onClick={() => navigate(`/events/${event.event_id}`)} className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <img src={event.image} alt={event.title} />
      <p className="event-location">{event.location}</p>
      <p className="event-date">
        {new Date(event.date).toLocaleDateString("en-GB")} @
        {event.time.split(":").slice(0, 2).join(":")}
      </p>
    </figure>
  );
};

export default EventCard;
