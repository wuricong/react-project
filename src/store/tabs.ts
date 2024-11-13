import { createSlice } from "@reduxjs/toolkit";

// console.log(
//   'sessionStorage.getItem("activeKey")',
//   sessionStorage.getItem("activeKey"),
// );
const useTabsStore = createSlice({
  name: "tabs",
  initialState: {
    activeKey: "1",
    menuActive: "1",
  },
  reducers: {
    changeActive(state, action) {
      // localStorage.setItem("activeKey", action.payload);
      state.activeKey = action.payload;
    },
    changeMenuActive(state, action) {
      state.menuActive = action.payload;
    },
  },
});

export const { changeActive, changeMenuActive } = useTabsStore.actions;

export default useTabsStore.reducer;
