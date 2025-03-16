import EventList from "../components/EventList";

const MyEvents = ({ myEvents }) => {
  return (
    <main>
      <header className="page-title">
        <h1>My Events</h1>
      </header>
      <section>
        <EventList events={myEvents} />
      </section>
    </main>
  );
};

export default MyEvents;
