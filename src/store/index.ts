import { configureStore } from "@reduxjs/toolkit";
import counter from "../features/counter/counterSlice";
import viewModel from "@/store/viewModel";
import tabs from "@/store/tabs.ts";
import userInfo from "@/store/userInfo.ts";

export default configureStore({
  reducer: { counter, viewModel, tabs, userInfo },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //TODO 关闭无法序列化问题，未知原因导致，后期关注。
      serializableCheck: false,
    }),
});
