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

//获取农历信息
export function getCalendar() {
  return requestApi("/calendar");
}
