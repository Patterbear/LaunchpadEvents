import { useLocation, useNavigate } from "react-router-dom";

const RegisteredPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  if (!event) {
    return (
      <div className="registered-container">
        <h2>No event found</h2>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const handleAddToCalendar = () => {
    const eventTitle = encodeURIComponent(event.title);
    const eventLocation = encodeURIComponent(event.address);
    const eventDescription = encodeURIComponent(event.description);

    const eventDate = new Date(event.date);
    const [hour, minute] = event.time.split(":").map(Number);
    eventDate.setUTCHours(hour, minute, 0, 0);
    const endDateTime = new Date(eventDate.getTime() + 60 * 60 * 1000);

    const formatDateTime = (date) =>
      date.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDescription}&location=${eventLocation}&dates=${formatDateTime(
      eventDate
    )}/${formatDateTime(endDateTime)}&sf=true&output=xml`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="registered-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>

      <div className="registered-card">
        <h2>You're Registered!</h2>
        <h3>{event.title}</h3>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(event.date).toLocaleDateString("en-GB")}
        </p>
        <p>
          <strong>Time:</strong> {event.time.split(":").slice(0, 2).join(":")}
        </p>
        <p>
          <strong>Location:</strong> {event.address}
        </p>
        <img src={event.image} alt={event.title} className="event-image" />

        <button onClick={() => handleAddToCalendar()}>Add to Calendar</button>
      </div>
    </div>
  );
};

export default RegisteredPage;
