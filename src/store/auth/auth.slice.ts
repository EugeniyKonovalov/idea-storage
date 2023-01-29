import { createSlice } from "@reduxjs/toolkit";
import { authType } from "types/auth_types";

const initialState: authType = {
  is_sign_up: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpToogle: (state) => {
      state.is_sign_up = !state.is_sign_up;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
