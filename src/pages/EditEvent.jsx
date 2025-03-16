import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchEventById, updateEventById } from "../../api";

const EditEvent = () => {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    address: "",
    date: "",
    time: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEventById(event_id)
      .then((event) => {
        setFormData({
          title: event.title,
          location: event.location,
          address: event.address,
          date: event.date.split("T")[0],
          time: event.time,
          image: event.image,
          description: event.description,
        });
      })
      .catch((error) => console.error("Error fetching event:", error));
  }, [event_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image;

    if (formData.image instanceof File) {
      const imageData = new FormData();
      imageData.append("key", "05d2c7e7bf3b870079dd12ec888a897f");
      imageData.append("image", formData.image);

      try {
        const imageResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          imageData
        );
        imageUrl = imageResponse.data.data.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Try again.");
        setLoading(false);
        return;
      }
    }

    const updatedEvent = {
      title: formData.title,
      location: formData.location,
      address: formData.address,
      date: formData.date,
      time: formData.time,
      image: imageUrl,
      description: formData.description,
    };

    updateEventById(event_id, updatedEvent)
      .then(() => {
        alert("Event updated successfully!");
        navigate(`/events/${event_id}`);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        alert("Failed to update event. Please try again.");
      })
      .finally(() => {
        console.log(updatedEvent);
        setLoading(false);
      });
  };

  return (
    <main className="edit-event-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <section className="edit-event-card">
        <h2>Edit Event</h2>
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

          <section className="date-time">
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
          </section>

          <label className="file-upload">
            Upload New Image:
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Updating..." : "Update Event"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default EditEvent;
