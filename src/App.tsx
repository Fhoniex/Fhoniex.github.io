import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import HealthData from "@/pages/HealthData";
import Analysis from "@/pages/Analysis";
import FamilyCare from "@/pages/FamilyCare";
import Rehabilitation from "@/pages/Rehabilitation";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health-data" element={<HealthData />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/family-care" element={<FamilyCare />} />
        <Route path="/rehabilitation" element={<Rehabilitation />} />
      </Routes>
    </AuthContext.Provider>
  );
}
