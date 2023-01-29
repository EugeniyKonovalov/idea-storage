import { Flex } from "@chakra-ui/react";
import DefaultBtn from "components/ui/defaultBtn";
import React, { useEffect } from "react";

import CustomInput from "components/ui/customInput";
import { useActions } from "hooks/useActions";
import useInput from "hooks/useInput";
import { getFolders, getIsExistName } from "store/folder/folder.selectors";
import useAppRouter from "hooks/useAppRouter";
import FolderValidationText from "./folder_validation_text";
import useGenerateId from "hooks/useGenerateId";

const AddRootFolder = () => {
  const { isExistName, addNewFolder, setIsShowAddRootFolder } = useActions();
  const folders = getFolders();
  const isExist = getIsExistName();
  const newFolderId = useGenerateId(folders);

  const isEmpty = (value: string) => value !== "";

  const {
    data: folder,
    setData: setFolder,
    changeHandler: folderChangeHandler,
    blurHandler: folderBlurHandler,
    isTouched: folderInputIsTouched,
    leaveFocusHandler: folderLeaveFocusHandler,
  } = useInput(isEmpty);

  const addNewFolderHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (folders?.map((item) => item.name)?.includes(folder?.name)) {
      isExistName(true);
      return;
    }
    isExistName(false);
    folder?.name &&
      addNewFolder({
        id: newFolderId,
        parent_id: 1,
        name: folder?.name,
      });
    setFolder("");
    folderLeaveFocusHandler();
    setIsShowAddRootFolder(false);
  };

  useEffect(() => {
    isExistName(
      folders?.map((item) => item.name)?.includes(folder?.name) ? true : false
    );
  }, [folder?.name]);

  return (
    <Flex
      as={"form"}
      onSubmit={addNewFolderHandler}
      alignItems={"center"}
      columnGap={"24px"}
      w={"100%"}
      pos={"relative"}
    >
      <CustomInput
        input={{
          id: "name",
          type: "text",
          maxlength: "20",
          value: folder?.name || "",
          placeholder: "Enter folder name",
        }}
        onChange={folderChangeHandler}
        onBlur={folderBlurHandler}
      />
      <DefaultBtn title={"Add folder"} onClick={addNewFolderHandler} />
      <FolderValidationText
        isExistName={isExist}
        folderName={folder?.name}
        isTouched={folderInputIsTouched}
        topPosition={"60px"}
      />
    </Flex>
  );
};

export default AddRootFolder;
