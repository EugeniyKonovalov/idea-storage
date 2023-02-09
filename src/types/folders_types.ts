export interface folderType {
  id: number;
  parent_id?: number | string;
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
}
export interface subFoldersIconType {
  item: folderType;
  isOpenAddNewFolder: () => void;
  isOpenAddNewNote: () => void;
  deleteFolderHandler: (folder_id: number) => void;
  isEditFolderNameHandler: () => void;
}
