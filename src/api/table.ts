import { requestApi } from "@/service";

// interface Params {
//   data?: any;
// }

export function getMoneyTable() {
  return requestApi("/moneyList");
}

export function updateMoneyList() {
  return requestApi("/updateMoneyList");
}

//获取内地排行榜
export function updateCNMoneyList() {
  return requestApi("/updateCNMoneyList");
}

//获取农历信息
export function getCalendar() {
  return requestApi("/calendar");
}

//获取汇率
export function getExchange() {
  return requestApi("/exchange");
}
