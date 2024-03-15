import axios from "axios";

const authToken = sessionStorage.getItem("authToken");

const getUserData = () => {
  return axios.get("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export { getUserData };
