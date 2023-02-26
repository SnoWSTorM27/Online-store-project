import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const orderEndpoint = "order/";

const orderService = {
  get: async () => {
    const { data } = await httpService.get(orderEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(orderEndpoint, payload);
    return data;
  },
  getCurrentUserOrders: async () => {
    const { data } = await httpService.get(
      orderEndpoint + localStorageService.getUserId()
    );
    return data;
  }
};

export default orderService;
