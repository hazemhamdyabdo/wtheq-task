import axiosIns from "../plugins/axios";

const methods = ["get", "post", "put", "delete", "patch"];

const service = methods.reduce((api, method) => {
  api[method] = (url, data) => {
    return axiosIns[method](url, data);
  };
  return api;
}, {});

export const resource = (resourceUrl) => ({
  get: (params = {}) => service.get(resourceUrl, { params }),
  post: (data) => service.post(resourceUrl, data),
  put: (id, data) => service.put(`${resourceUrl}/${id}`, data),
  delete: (id) => service.delete(`${resourceUrl}/${id}`),
  patch: (id, data) => service.patch(`${resourceUrl}/${id}`, data),
});
