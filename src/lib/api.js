import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const getProducts = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data;
};
