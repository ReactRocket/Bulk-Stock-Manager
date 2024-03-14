import axios from "axios";

const authToken = sessionStorage.getItem("authToken");

axios
  .get("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  .then((response) => {
    console.log("Authenticated user:", response.data);
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
  });
