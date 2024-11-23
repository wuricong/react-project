import { createSlice } from "@reduxjs/toolkit";

const viewModelSlice = createSlice({
  name: "model",
  initialState: {
    status: "white",
  },
  reducers: {
    changeModel(state, action) {
      state.status = action.payload;
    },
  },
});

export const { changeModel } = viewModelSlice.actions;

export default viewModelSlice.reducer;
