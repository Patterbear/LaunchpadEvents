import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById, removeEventById } from "../../api";
import loadingGif from "../assets/loading.gif";

const EventPage = ({ profile, onEventDeleted }) => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventById(event_id)
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
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

  const handleRegister = () => {
    if (!profile) {
      navigate("/login");
      return;
    }
    navigate("/registered", { state: { event } });
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
    <>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>

      {/* Show edit & delete buttons only if profile.role is "admin" */}
      {profile?.role === "admin" && (
        <>
          <button
            onClick={() => navigate(`/events/${event_id}/edit`)}
            className="edit-button"
          >
            ✏️
          </button>
          <button onClick={handleDeleteEvent} className="delete-button">
            🗑️
          </button>
        </>
      )}

      <div className="event-page">
        <h2>{event.title}</h2>
        <img
          id="event-page-img"
          src={event.image}
          alt={event.title}
          className="event-image"
        />
        <div className="event-details">
          <div className="event-meta">
            <p>
              <strong>📍 {event.location}</strong>
            </p>
            <p>📅 {new Date(event.date).toLocaleDateString("en-GB")}</p>
            <p>⏰ {event.time.split(":").slice(0, 2).join(":")}</p>
            <i>{event.address}</i>
          </div>
          <p className="event-description">{event.description}</p>

          <button className="register-button" onClick={handleRegister}>
            {profile ? "Register" : "Sign in to Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EventPage;
