import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => action.payload,
    removeConnection: () => null,
  },
});

export const { addConnection, removeConnection } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
