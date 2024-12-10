import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import counter from "../features/counter/counterSlice";
import { composeWithDevTools } from "redux-devtools-extension";
import viewModel from "@/store/viewModel";
import tabs from "@/store/tabs.ts";
import userInfo from "@/store/userInfo.ts";
// import { thunk } from "redux-thunk";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export default configureStore({
  reducer: { counter, viewModel, tabs, userInfo },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: "",
      },
      //TODO 关闭无法序列化问题，未知原因导致，后期关注。
      serializableCheck: false,
    }),
});
