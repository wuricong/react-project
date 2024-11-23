import { configureStore } from "@reduxjs/toolkit";
import counterReduce from "../features/counter/counterSlice";
import viewModel from "@/store/viewModel";
import tabs from "@/store/tabs.ts";
import userInfo from "@/store/userInfo.ts";

export default configureStore({
  reducer: { counter: counterReduce, viewModel, tabs, userInfo },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
