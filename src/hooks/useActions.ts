import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import authSlice, { actions } from "store/auth/auth.slice";
import { useAppDispatch } from "./useRedux";

const rootAction = {
  ...actions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
