import React, { useState } from "react";
import "./LoginScreen.css";
import sound from "./assets/LoginKeyClick.mp3";

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login button clicked"); // Debugging log
    onLogin(); // Trigger the transition to the desktop screen
  };

  function keysound() {
    new Audio(sound).play();
  }

  const handleChange = (e) => {
    keysound();  // Play the sound on input change
    setPassword(e.target.value);  // Update the password state
  };

  return (
    <div className="login-container">
      <img src="https://via.placeholder.com/80" alt="User Avatar" />
      <h1>Welcome</h1>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handleChange}  // Use the updated function
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginScreen;
