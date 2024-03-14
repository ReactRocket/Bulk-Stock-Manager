import axios from "axios";

const authenticateUser = async (username, password) => {
  return await axios
    .post("https://dummyjson.com/auth/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      const authToken = response.data.token;
      sessionStorage.setItem("authToken", authToken);
      return authToken;
    })
    .catch((error) => {
     alert("Wrong username or password!")
    });
};

export { authenticateUser };
