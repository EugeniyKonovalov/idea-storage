import { Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch } from "store";
import { errorType } from "types/error_type";
import { errorAction } from "./errors.slice";

const loadingErrors = (error: any) => (dispatch: Dispatch) => {
  dispatch(
    errorAction.loadErrors(
      error?.message ? error?.message : error?.response?.data?.message
    )
  );
};

const clearErrors = () => (dispatch: Dispatch) =>
  dispatch(errorAction.clearError());

export { loadingErrors, clearErrors };
