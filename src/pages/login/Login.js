import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginInitialise,
  loginSuccess,
  loginError,
} from "../../redux/slices/authentication.slice";

import { authenticateUser } from "../../apis/authService";

const Login = () => {
  const navigate = useNavigate();
  const form = useRef();
  const data = useSelector((state) => state.authenticateUser.data);
  const loading = useSelector((state) => state.authenticateUser.loading);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginInitialise());
    try {
      const result = await authenticateUser(
        form.current.username.value,
        form.current.password.value
      );

      if (result) {
        dispatch(loginSuccess(result));
        navigate("/dashboard");
      } else {
        dispatch(loginError());
        form.current.reset();
        form.current.username.focus();
      }
    } catch (error) {
      dispatch(loginError());
      form.current.reset();
      form.current.username.focus();
    }
  };

  useEffect(() => {
    if (data || sessionStorage.getItem("authToken")) {
      navigate("/dashboard");
    }
  }, [dispatch, navigate, data]);

  return (
    <>
      <div class="m-auto  h-screen  xl:container px-12 sm:px-0 mx-auto">
        <div class="mx-auto h-full w-1/4 flex justify-center items-center">
          <div class="m-auto  py-12 w-full ">
            <div class="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
              <h3 class="text-2xl font-semibold text-gray-700 dark:text-white">
                Login to your account
              </h3>

              <form
                ref={form}
                onSubmit={handleSubmit}
                class="mt-10 space-y-8 dark:text-white"
              >
                <div>
                  <div class="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      required
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Your  username"
                      class="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                    />
                  </div>
                </div>

                <div class="flex flex-col items-end">
                  <div class="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      required
                      id="password"
                      name="password"
                      type="Your password"
                      placeholder="Your password"
                      class="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={loading ? true : false}
                    class={`w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800 gap-3`}
                  >
                    <span class="text-base font-semibold text-white dark:text-gray-900">
                      Login
                    </span>
                    {loading && (
                      <span className="h-5 w-5 border-2 border-y-black  animate-spin rounded-full"></span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
