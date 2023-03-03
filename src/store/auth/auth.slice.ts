import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { authType } from "types/auth_types";
import authExtraActions from "./auth.actions";

const initialState: authType = {
  user: null,
  token: "",
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  is_show_password: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showPassword: (state) => {
      state.is_show_password = !state.is_show_password;
    },
    logOutState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(authExtraActions.signUp.pending, (state: authType) => {
      state.isLoading = true;
    });
    builder.addCase(authExtraActions.signUp.fulfilled, (state, action) => {
      state.token = action.payload?.refreshToken;
      state.isLoggedIn = !!action.payload?.refreshToken || undefined;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(authExtraActions.signUp.rejected, (state: authType) => {
      state.isLoading = false;
      state.isError = true;
      state.isLoggedIn = false;
    });
    builder.addCase(authExtraActions.signIn.pending, (state: authType) => {
      state.isLoading = true;
    });
    builder.addCase(authExtraActions.signIn.fulfilled, (state, action) => {
      state.token = action.payload?.refreshToken;
      state.isLoggedIn = !!action.payload?.refreshToken || undefined;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    });
    builder.addCase(authExtraActions.signIn.rejected, (state: authType) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
