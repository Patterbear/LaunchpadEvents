import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById } from "../../api";
import banner from "../assets/banner.png";
import backButtonImg from "../assets/back.png";
import loadingGif from "../assets/loading.gif";
import Header from "../components/Header";

const EventPage = ({ profile }) => {
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
    const eventTitle = encodeURIComponent(event.title);
    const eventLocation = encodeURIComponent(event.address);
    const eventDescription = encodeURIComponent(event.description);
  
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDescription}&location=${eventLocation}&sf=true&output=xml`;
  
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
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
  <button className="register-button" onClick={handleRegister}>Register</button>
</div>
</div>
    </>
  );
};

export default EventPage;