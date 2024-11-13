import { createSlice } from "@reduxjs/toolkit";

const useTabsStore = createSlice({
  name: "tabs",
  initialState: {
    activeKey: sessionStorage.getItem("activeKey") || "1",
  },
  reducers: {
    changeActive(state, action) {
      state.activeKey = action.payload;
    },
  },
});

export const { changeActive } = useTabsStore.actions;

export default useTabsStore.reducer;
