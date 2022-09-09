import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//screens
import LandingPage from "./Screens/LandingPage";
import Register from "./Screens/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
