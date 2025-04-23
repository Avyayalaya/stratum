import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CognitiveMastery from "./pages/CognitiveMastery";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cognitive" element={<CognitiveMastery />} />
      </Routes>
    </Router>
  );
}
