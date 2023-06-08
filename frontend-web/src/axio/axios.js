import axios from "axios";

export const instanceApiGHN = axios.create({
  baseURL: "https://dev-online-gateway.ghn.vn/shiip/public-api/",
});
instanceApiGHN.interceptors.request.use((config) => {
  const token = "03fbbe34-dbb4-11ed-ab31-3eeb4194879e";
  config.headers.Token = token;
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default axios;