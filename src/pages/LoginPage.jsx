import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const LoginPage = ({ setProfile, setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validUsers = {
    "admin@launchpadevents.co.uk": "admin123",
    "user@launchpadevents.co.uk": "user123",
  };

  const logIn = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      navigate(-1);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const { username, password } = formData;

      if (validUsers[username] && validUsers[username] === password) {
        const userProfile = {};
        if (username == "admin@launchpadevents.co.uk") {
          userProfile.role = "admin";
          userProfile.picture = "https://i.ibb.co/SXT2Knjx/admin.jpg";
        } else {
          userProfile.role = "user";
          userProfile.picture = "https://i.ibb.co/kVXjdPg8/user.jpg";
        }
        setProfile(userProfile);
        navigate(-1);
      } else {
        setError("Invalid credentials. Please try again.");
      }

      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogIn = () => {
    logIn();
  };

  return (
    <main className="login-container">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <section className="login-card">
        <h2>Login</h2>
        {error && <p className="error" >{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <hr />

        <button onClick={handleGoogleLogIn} className="google-signin">
          Sign in with Google
        </button>
      </section>
    </main>
  );
};

export default LoginPage;
