import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorsType } from "types/error_type";

const initialState: errorsType = {
  errorData: null,
};

const errorsSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    loadErrors: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.errorData)) state.errorData = [];
      state.errorData.push(action.payload);
    },
    clearError: (state) => {
      state.errorData = null;
    },
  },
});
export const errorAction = errorsSlice.actions;

export default errorsSlice.reducer;
