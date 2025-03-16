import EventCard from "./EventCard";

const EventList = ({ events }) => {
  return (
    <section className="event-list">
      {events.map((event) => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </section>
  );
};

export default EventList;
