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
    addPointsFromQuery: (state, action) => {
      let i = 0;
      while (action.payload[i] != null) {
        state.push(action.payload[i]);

        i += 1;
      }
    },
  },
});

export const { addPoint, addPointsFromQuery } = pointesSlice.actions;

export default pointesSlice.reducer;
