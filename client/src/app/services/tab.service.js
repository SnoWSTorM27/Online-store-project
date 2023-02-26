import httpService from "./http.service";

const tabEndpoint = "tab/";

const tabService = {
  fetchAll: async () => {
    const { data } = await httpService.get(tabEndpoint);
    return data;
  }
};

export default tabService;
