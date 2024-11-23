import { createSlice } from "@reduxjs/toolkit";
import { MenuItems } from "@/layout/menu.tsx";

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    selectMenu: [{ label: "首页" }],
    token: "",
    tags: [{ ...MenuItems[0], closeIcon: false }],
  },
  reducers: {
    changeSelectMenu(state, action) {
      console.log("action", action.payload);
      state.selectMenu = action.payload;
    },
    changeTags(state, action) {
      state.tags = action.payload;
    },
    clearUserInfo(state: any, action) {
      state.selectMenu = "";
      state.token = "";
    },
  },
});

export const { changeSelectMenu, changeTags } = userInfo.actions;

export default userInfo.reducer;
