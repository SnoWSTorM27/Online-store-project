import httpService from "./http.service";

const goodEndpoint = "good/";

const goodService = {
  create: async (payload) => {
    const { data } = await httpService.post(goodEndpoint, payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(goodEndpoint + payload._id, payload);
    return data;
  },
  fetchAll: async () => {
    const { data } = await httpService.get(goodEndpoint);
    return data;
  },
  getGoods: async (categoryId) => {
    const { data } = await httpService.get(goodEndpoint, {
      params: {
        orderBy: "cagory",
        equalTo: `${categoryId}`
      }
    });
    return data;
  },
  remove: async (goodId) => {
    const { data } = await httpService.delete(goodEndpoint + goodId);
    return data;
  }
};

export default goodService;
