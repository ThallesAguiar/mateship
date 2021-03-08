import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// baseURL: 'http://10.0.0.9:3333', //windows
const api = axios.create({
  baseURL: "http://192.168.0.68:3333",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default api;
