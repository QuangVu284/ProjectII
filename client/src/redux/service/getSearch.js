import instance from "./instance";

export const getSearch = (params) => {
  const url = "/search";
  return instance.get(url, params);
};
