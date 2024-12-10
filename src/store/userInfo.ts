import { createSlice } from "@reduxjs/toolkit";
import { MenuItems } from "@/layout/menu.tsx";
import dayjs from "dayjs";
import { setExchangeList } from "@/api/table.ts";

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    selectMenu: [{ label: "首页" }],
    token: "",
    tags: [{ ...MenuItems[0], closeIcon: false }],
    exchange: null,
  },
  reducers: {
    changeSelectMenu(state, action) {
      state.selectMenu = action.payload;
    },
    changeTags(state, action) {
      state.tags = action.payload;
    },
    clearUserInfo(state: any) {
      state.selectMenu = [{ label: "首页" }];
      state.token = "";
      state.tags = [{ ...MenuItems[0], closeIcon: false }];
    },
    setExchange(state, action) {
      const date = dayjs().format("YYYY-MM-DD");
      //async fn 异步函数
      setExchangeList(action.payload);
    },
  },
});

export const { changeSelectMenu, changeTags, clearUserInfo, setExchange } =
  userInfo.actions;

export default userInfo.reducer;
