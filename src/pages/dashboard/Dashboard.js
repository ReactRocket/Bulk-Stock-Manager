import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authentication.slice";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div>
      Dashboard
      <button
        onClick={() => {
          sessionStorage.removeItem("authToken");
          dispatch(logout());
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
