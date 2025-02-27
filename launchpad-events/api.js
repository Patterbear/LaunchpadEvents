import axios from "axios";

const api = axios.create({
  baseURL: "https://launchpad-events-platform.onrender.com/api",
});

export const fetchEvents = () => {
  return api.get("/events").then((response) => {
    return response.data.events;
  });
};
