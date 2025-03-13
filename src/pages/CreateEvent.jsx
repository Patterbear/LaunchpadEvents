import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { postEvent } from "../../api";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    address: "",
    date: "",
    time: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    const imageData = new FormData();
    imageData.append("key", "05d2c7e7bf3b870079dd12ec888a897f");
    imageData.append("image", formData.image);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((imageResponse) => {
        console.log(imageResponse);
        imageUrl = imageResponse.data.data.url;
        console.log(`Hello ${imageUrl}`);

        const eventDetails = {
          title: formData.title,
          location: formData.location,
          address: formData.address,
          date: formData.date,
          time: formData.time,
          image: imageUrl,
          description: formData.description,
        };

        return postEvent(eventDetails);
      })
      .then((response) => {
        alert("Event created successfully!");
        navigate(`/events/${response.data.event.event_id}`);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("Failed to create event. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="create-event-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <div className="create-event-card">
        <h2>Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Event Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>

          <div className="date-time">
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="file-upload">
            Upload Image:
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
