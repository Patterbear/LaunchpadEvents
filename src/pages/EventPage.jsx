import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById, removeEventById } from "../../api";
import loadingGif from "../assets/loading.gif";

const EventPage = ({ profile, onEventDeleted, setMyEvents, myEvents }) => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const isRegistered =
    event && myEvents.some((e) => e.event_id === event.event_id);

  useEffect(() => {
    fetchEventById(event_id)
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        setEvent(null);
        setLoading(false);
      });
  }, [event_id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>Event Not Found</h2>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const handleRegister = () => {
    if (!profile) {
      navigate("/login");
      return;
    }

    if (!myEvents.some((e) => e.event_id === event.event_id)) {
      setMyEvents([...myEvents, event]);
    }

    navigate("/registered", { state: { event } });
  };

  const handleUnregister = () => {
    setMyEvents(myEvents.filter((e) => e.event_id !== event.event_id));
    navigate("/events");
  };

  const handleDeleteEvent = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (isConfirmed) {
      removeEventById(event_id)
        .then(() => {
          navigate(-1);
          onEventDeleted();
        })
        .catch((error) => console.error("Error deleting event:", error));
    }
  };

  return (
    <main>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      {profile?.role === "admin" && (
        <>
          <button
            aria-label="Edit"
            onClick={() => navigate(`/events/${event_id}/edit`)}
            className="edit-button"
          >
            ✏️
          </button>
          <button
            aria-label="Delete"
            onClick={handleDeleteEvent}
            className="delete-button"
          >
            🗑️
          </button>
        </>
      )}

      <section className="event-page">
        <h2>{event.title}</h2>
        <img src={event.image} alt={event.title} className="event-image" />
        <section className="event-details">
          <p>
            <strong>📍 {event.location}</strong>
          </p>
          <p>📅 {new Date(event.date).toLocaleDateString("en-GB")}</p>
          <p>⏰ {event.time.split(":").slice(0, 2).join(":")}</p>
          <i>{event.address}</i>
          <p className="event-description">{event.description}</p>
        </section>

        {isRegistered ? (
          <button className="register-button" onClick={handleUnregister}>
            Unregister
          </button>
        ) : (
          <button className="register-button" onClick={handleRegister}>
            {profile ? "Register" : "Sign in to Register"}
          </button>
        )}
      </section>
    </main>
  );
};

export default EventPage;
