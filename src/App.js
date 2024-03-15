import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const data = useSelector((state) => state.authenticateUser.data);
  const loading = useSelector((state) => state.authenticateUser.loading);
  const message = useSelector((state) => state.authenticateUser.message);
  const isSuccess = useSelector((state) => state.authenticateUser.isSuccess);

  useEffect(() => {
    if (!isSuccess && !!message) {
      toast.error("username or password incorrect!");
    } else if (isSuccess && !!data) {
      toast.success("Loging Successfully!");
    }
  }, [data, loading, message, isSuccess]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="*" name="Login Page" element={<Login />} />
        {(data || sessionStorage.getItem("authToken")) && (
          <Route
            exact
            path="/dashboard"
            name="Dashboard"
            element={<Dashboard />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
