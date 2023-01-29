import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { authActions } from "store/auth/auth.slice";
import { foldersAction } from "store/folder/folders.slice";
import { useAppDispatch } from "./useRedux";

const rootAction = {
  ...authActions,
  ...foldersAction,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
