/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../apis/getUserData";
import { logout } from "../../redux/slices/authentication.slice";
import {
  userInfoInitialise,
  userInfoSuccess,
  userInfoError,
} from "../../redux/slices/userInfo.slice";
import Loader from "../../components/Loader";
import Table from "../../components/Table";

const Dashboard = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authenticateUser.data);
  const userInfo = useSelector((state) => state.userInfo.data);
  const loading = useSelector((state) => state.userInfo.loading);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userInfo");
      dispatch(logout());
      toast.error("Logged Out!");
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(userInfoInitialise());
    const result = getUserData(data);
    result
      .then((user) => {
        sessionStorage.setItem("userInfo", JSON.stringify(user.data));
        dispatch(
          userInfoSuccess(JSON.parse(sessionStorage.getItem("userInfo")))
        );
      })
      .catch((error) => {
        dispatch(userInfoError());
      });
  }, []);

  return (
    <>
      <div className="z-50 fixed  top-5 left-5 h-10 flex justify-end items-center">
        <button onClick={() => setMenuToggle(!menuToggle)}>
          {menuToggle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          )}
        </button>
      </div>
      <div class="bg-white  h-screen w-screen flex overflow-hidden">
        {loading && <Loader />}
        <aside
          class={`${
            menuToggle ? "lg:flex" : "hidden"
          }  z-10   h-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 lg:w-1/4 `}
        >
          <div>
            <div class="mt-8 text-center">
              <img
                src={userInfo?.image}
                alt=""
                class="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28"
              />
              <h5 class="mt-4 hidden text-xl font-semibold text-whbg-white lg:block ">
                {userInfo?.firstName} {userInfo?.lastName}
              </h5>
              <span class="hidden text-whbg-white lg:block">
                {" "}
                {userInfo?.phone}
              </span>
            </div>

            <ul class="mt-8 space-y-2 tracking-wide">
              <li>
                <a
                  href="#"
                  aria-label="dashboard"
                  class="relative flex items-center space-x-4 rounded-xl bg-sky-400 dark:bg-sky-800 px-4 py-3 text-white"
                >
                  <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                      class=" fill-current text-cyan-400"
                    ></path>
                    <path
                      d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                      class="fill-current text-cyan-200 group-hover:text-cyan-300"
                    ></path>
                    <path
                      d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                      class="fill-current group-hover:text-sky-300"
                    ></path>
                  </svg>
                  <span class="-mr-1 font-medium">Dashboard</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="-mx-6 flex items-center justify-between border-t px-6 pt-4 ">
            <button
              onClick={handleLogout}
              class="group flex items-center space-x-4 rounded-md px-4 py-3 text-whbg-white "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="group-hover:text-whbg-white -whbg-white">
                Logout
              </span>
            </button>
          </div>
        </aside>

        <div
          className={`${menuToggle ? "fixed lg:relative w-full lg:w-3/4" : "w-full"}  h-full `}
        >
          <Table />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
