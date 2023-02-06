import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { foldersType, folderType } from "types/folders_types";

const initialState: foldersType = {
  is_exist_folder_name: false,
  folders: [],
  is_selected_folder: null,
  is_add_subfolder: false,
  is_show_add_root_folder: false,
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    isExistName: (state, action: PayloadAction<boolean>) => {
      state.is_exist_folder_name = action.payload;
    },
    setFolders: (state, action: PayloadAction<folderType[]>) => {
      state.folders = action.payload;
    },

    addNewFolder: (state, action: PayloadAction<folderType>) => {
      state.folders.push(action.payload);
    },
    setSelectedFolder: (state, action: PayloadAction<folderType>) => {
      state.is_selected_folder = action.payload;
    },
    setIsOpenFolder: (state) => {
      state.is_add_subfolder = !state.is_add_subfolder;
    },
    setIsShowAddRootFolder: (state, action: PayloadAction<boolean>) => {
      state.is_show_add_root_folder = action.payload;
    },
  },
});
export const foldersAction = foldersSlice.actions;
export default foldersSlice.reducer;
