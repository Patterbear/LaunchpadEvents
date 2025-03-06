import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import EventPage from "./components/EventPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:event_id" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
