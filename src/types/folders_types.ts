export interface folderType {
  id: number;
  parent_id?: number;
  user_id?: number | string;
  name: string;
}

export interface foldersType {
  is_exist_folder_name: boolean;
  folders: folderType[];
  is_selected_folder: folderType | null;
  is_add_subfolder: boolean;
  is_show_add_root_folder: boolean;
}

export interface subFoldersType {
  item: folderType;
  childrenFolder: (id: number) => void;
}
export interface subFoldersIconType {
  item: folderType;
  isOpenAddNewFolder: () => void;
  isOpenAddNewNote: () => void;
  deleteFolderHandler: (item: folderType) => void;
  isEditFolderNameHandler: () => void;
}
