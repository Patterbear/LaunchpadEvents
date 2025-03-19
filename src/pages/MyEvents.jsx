import MyEventList from "../components/MyEventList";
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
        {myEvents.length > 0 ? (
          <MyEventList events={myEvents} />
        ) : (
          <p>You have not registered for any events.</p>
        )}
      </section>
    </main>
  );
};

export default MyEvents;
