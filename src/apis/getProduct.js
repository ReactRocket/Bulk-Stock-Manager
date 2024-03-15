import axios from "axios";

const authToken = sessionStorage.getItem("authToken");

const getAllProducts = () => {
  return axios.get("https://dummyjson.com/products");
};

const deleteProduct = (id) => {
  return axios(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
};
const searchProduct = (query) => {
  return axios.get(`https://dummyjson.com/products/search?q=${query}`);
};

const addProduct = (data) => {
  return axios("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export { getAllProducts, deleteProduct, searchProduct ,addProduct};
