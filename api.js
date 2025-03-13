import axios from "axios";

const api = axios.create({
  baseURL: "https://launchpad-events-platform.onrender.com/api",
});

export const fetchEvents = (sort_by, location) => {
  if (location == "All Locations") {
    location = undefined;
  }

  return api
    .get("/events", {
      params: {
        sort_by: sort_by,
        location: location,
      },
    })
    .then((response) => {
      console.log(response.data.events);
      return response.data.events;
    });
};

export const fetchEventById = (event_id) => {
  return api.get(`/events/${event_id}`).then((response) => {
    return response.data.event;
  });
};

export const postEvent = (event) => {
  return api.post(`/events`, event);
};
