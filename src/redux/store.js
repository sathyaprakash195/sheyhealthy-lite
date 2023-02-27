import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";


export const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
  },
});
