import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import RegisteredPage from "./pages/RegisteredPage";
import Header from "./components/Header";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const handleEventDeleted = () => {
  fetchEvents().then((data) => setEvents(data));
};

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const logIn = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user, setProfile]);

  return (
    <Router>
      <Header profile={profile} logIn={logIn} logOut={logOut} />
      <Routes>
        <Route path="/" element={<Navigate to="/events" />} />
        <Route path="/events" element={<Home />} />
        <Route
          path="/events/:event_id"
          element={
            <EventPage profile={profile} logIn = {logIn} onEventDeleted={handleEventDeleted} />
          }
        />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events/:event_id/edit" element={<EditEvent />} />
        <Route path="/registered" element={<RegisteredPage />} />
      </Routes>
    </Router>
  );
};

export default App;
