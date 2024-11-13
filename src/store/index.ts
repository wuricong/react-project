import { configureStore } from "@reduxjs/toolkit";
import counterReduce from "../features/counter/counterSlice";
import viewModel from "@/store/viewModel";
import tabs from "@/store/tabs.ts";

export default configureStore({
  reducer: { counter: counterReduce, viewModel, tabs },
});
