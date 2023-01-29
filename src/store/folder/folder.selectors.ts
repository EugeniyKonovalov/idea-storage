import { useAppSelector } from "hooks/useRedux";

const getFolders = () => useAppSelector((state) => state.folders.folders);
const getIsExistName = () =>
  useAppSelector((state) => state.folders.is_exist_folder_name);
const getIsOpenFolder = () =>
  useAppSelector((state) => state.folders.is_add_subfolder);
const getIsAddRootFolder = () =>
  useAppSelector((state) => state.folders.is_show_add_root_folder);

export { getFolders, getIsExistName, getIsOpenFolder, getIsAddRootFolder };
