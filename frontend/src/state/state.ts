import { configureStore } from "@reduxjs/toolkit";
import pointReducer from "./points/PointesSlice";

export const store = configureStore({
  reducer: { points: pointReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
