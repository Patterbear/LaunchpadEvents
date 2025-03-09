import { useEffect, useState } from "react";
import { fetchEvents } from "../../api";
import EventList from "../components/EventList";
import SearchBar from "../components/SearchBar";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

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
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = ({ query, location, sortBy }) => {
    let filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) &&
        (location === "All" || event.location === location)
    );

    filtered.sort((a, b) =>
      sortBy === "soonest"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    setFilteredEvents(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
      <EventList events={events} />
    </div>
  );
};

export default Home;
