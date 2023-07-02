import instance from "./axios";

const url = "/rate";
const rateApi = {
  getAllRating: (id) => instance.get(`/rate/${id}`),
  addRateByUser: (body) => instance.post(`/rate/create`, body),
};

export default rateApi;
