import { getHistoryExchange } from "@/api/table.ts";

export async function fetchExchangeList(dispatch: any, getState: any) {
  const res = await getHistoryExchange();
  dispatch({});
}
