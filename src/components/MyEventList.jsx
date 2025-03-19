import EventCard from "./EventCard";

const MyEventList = ({ events }) => {
  return (
    <section className="my-event-list">
      {events.map((event) => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </section>
  );
};

export default MyEventList;
