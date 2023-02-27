import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    ShowLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { ShowLoader } = loaderSlice.actions;
