import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//screens
import LandingPage from "./Screens/LandingPage";
import Register from "./Screens/Register";
import Home from "./Screens/Home";
import Leaderboard from "./Screens/Leaderboard";
import Profile from "./Screens/Profile";
import Task1 from "./Screens/Task1";
import Task2 from "./Screens/Task2";
import Task3 from "./Screens/Task3";
import Task4 from "./Screens/Task4";
import Task5 from "./Screens/Task5";

function App() {
  const [imageNumber, setImageNumber] = useState(0);

  useEffect(() => {
    if (typeof window.randomNumber !== "undefined") {
      setImageNumber(window.randomNumber);
    } else {
      window.randomNumber = Math.floor(Math.random() * 10) + 1;
      setImageNumber(window.randomNumber);
    }
  });

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/task1" element={<Task1 randomNumber={imageNumber} />} />
        <Route exact path="/task2" element={<Task2 />} />
        <Route exact path="/task3" element={<Task3 />} />
        <Route exact path="/task4" element={<Task4 />} />
        <Route exact path="/task5" element={<Task5 />} />
      </Routes>
    </Router>
  );
}

export default App;
