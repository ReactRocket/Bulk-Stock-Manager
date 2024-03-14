import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { useSelector } from "react-redux";

const App = () => {
  const authentication = useSelector((state) => state.authenticateUser.value);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="*" name="Login Page" element={<Login />} />
        {(authentication || sessionStorage.getItem("authToken")) && (
          <Route exact path="/dashboard" name="Dashboard" element={<Dashboard />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
