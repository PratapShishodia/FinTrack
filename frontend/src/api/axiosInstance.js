import axios from "axios";

const PORT = process.env.REACT_APP_BACKEND_PORT || 8090;
const IP_ADDRESS = process.env.REACT_APP_BACKEND_IP_ADDRESS || "localhost";

const axiosInstance = axios.create({
  baseURL: `http://${IP_ADDRESS}:${PORT}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
