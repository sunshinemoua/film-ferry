import { configureStore } from "@reduxjs/toolkit";
import { filmReducer } from "./movieSlice";

export const store = configureStore({
  reducer: {
    films: filmReducer,
  },
});
