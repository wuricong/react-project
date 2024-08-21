import axios, { AxiosInstance } from "axios";
import { message } from "antd";

//type 字符串字面量
type reqMethods = "post" | "get" | "put" | "delete";

const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:9090",
  timeout: 50000,
});

// 请求拦截
http.interceptors.request.use((req) => {
  console.log("res", req);
  return req;
});

//响应拦截
http.interceptors.response.use((res) => {
  const { status } = res;
  console.log("res1111", res, status);
  if (status === 404) {
    message.error("请求错误");
  }
  return res;
});

export function requestApi(url: string, method: reqMethods) {
  http[method](url);
}

export default http;
