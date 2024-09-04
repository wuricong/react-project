import {configureStore} from "@reduxjs/toolkit";
import counterReduce from "../features/counter/counterSlice";
import viewModel from "@/store/viewModel";

export default configureStore({
  reducer: {counter: counterReduce, viewModel},
});
