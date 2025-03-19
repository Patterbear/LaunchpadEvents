import EventList from "../components/EventList";
import { useEffect } from "react";

const MyEvents = ({ myEvents }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <header>
        <h1 className="page-title">My Events</h1>
      </header>
      <section>
        <EventList events={myEvents} />
      </section>
    </main>
  );
};

export default MyEvents;
