import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import DelhiPage from "./pages/DelhiPage";
import Login from "./pages/Login";
import DelhiWeather from "./components/DelhiWeather";
const AnimatedRoutes = () => {
  return (
    <Routes>
      {/* No navbar/footer */}
      <Route path="/login" element={<Login />} />

      {/* With navbar/footer + animation */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="delhi" element={<DelhiPage />} />
        
      </Route>
    </Routes>
  );
};

export default AnimatedRoutes;