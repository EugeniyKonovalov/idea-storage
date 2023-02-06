import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import authExtraActions from "store/auth/auth.actions";
import { authActions } from "store/auth/auth.slice";

import { foldersAction } from "store/folder/folders.slice";
import { notesAction } from "store/notes/notes.slice";
import { useAppDispatch } from "./useRedux";

const rootAction = {
  ...authActions,
  ...authExtraActions,
  ...foldersAction,
  ...notesAction,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
