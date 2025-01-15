import { HitResult } from "@/components/table/columns";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HitResult[] = [];

const pointesSlice = createSlice({
  name: "radius",
  initialState,
  reducers: {
    addPoint: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPoint } = pointesSlice.actions;

export default pointesSlice.reducer;
