import { createSlice } from "@reduxjs/toolkit";
import { MenuItems } from "@/layout/menu.tsx";

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
    changeExchangeHistoryList(state: any, action: any) {
      state.exchange = action.payload;
    },
  },
});

export const {
  changeSelectMenu,
  changeTags,
  clearUserInfo,
  changeExchangeHistoryList,
} = userInfo.actions;

export default userInfo.reducer;
