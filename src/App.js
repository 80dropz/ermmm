import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import DesktopScreen from "./DesktopScreen";
import sound from "./assets/LoginKeyClick.mp3"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <DesktopScreen />
      )}
    </div>
  );
}

export default App;
