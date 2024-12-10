import { createSlice } from "@reduxjs/toolkit";
import { MenuItems } from "@/layout/menu.tsx";
import dayjs from "dayjs";

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    selectMenu: [{ label: "首页" }],
    token: "",
    tags: [{ ...MenuItems[0], closeIcon: false }],
    exchange: localStorage.getItem("exchangeDate"),
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
    setExchange(state) {
      const date = dayjs().format("YYYY-MM-DD");
      console.log("action", state);
      const params = {};
      localStorage.setItem("exchangeDate", date);
    },
  },
});

export const { changeSelectMenu, changeTags, clearUserInfo, setExchange } =
  userInfo.actions;

export default userInfo.reducer;
