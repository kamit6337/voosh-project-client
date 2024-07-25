import axios from "axios";
import environment from "../environment";

const BASE_URL = environment.SERVER_URL;

export const getReq = async (url: string, params?: object) => {
  const get = await axios.get(`${BASE_URL}${url}`, {
    params,
    withCredentials: true,
  });

  return get?.data;
};

export const postReq = async (url: string, body: object) => {
  const post = await axios.post(`${BASE_URL}${url}`, body, {
    withCredentials: true,
  });

  return post?.data;
};

export const patchReq = async (url: string, body: object) => {
  const patch = await axios.patch(`${BASE_URL}${url}`, body, {
    withCredentials: true,
  });

  return patch?.data;
};

export const deleteReq = async (url: string, params: object) => {
  const deleted = await axios.delete(`${BASE_URL}${url}`, {
    params,
    withCredentials: true,
  });

  return deleted?.data;
};
