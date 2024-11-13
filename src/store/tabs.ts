import { createSlice } from "@reduxjs/toolkit";

const useTabsStore = createSlice({
  name: "tabs",
  initialState: {
    activeKey: "1",
  },
  reducers: {
    changeActive(state, action) {
      state.activeKey = action.payload;
    },
  },
});

export const { changeActive } = useTabsStore.actions;

export default useTabsStore.reducer;
