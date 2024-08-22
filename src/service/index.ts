import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
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

/**
 * 请求封装
 * @param url 请求的URL地址
 * @param method 请求的方法
 * @param config 请求的数据及其他配置
 * */
export function requestApi(
  url: string,
  method?: reqMethods,
  config?: AxiosRequestConfig,
) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http[method || "get"](url, { ...config });
      resolve(res);
    } catch (e: any) {
      message.error("请求错误");
      reject(e);
    }
  });
}
