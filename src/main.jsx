import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="162294971736-143nfs6g167lcd7p3lj8tlvm8hrjknuk.apps.googleusercontent.com">
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </GoogleOAuthProvider>
);
