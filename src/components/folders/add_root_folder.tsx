import { Flex, Image } from "@chakra-ui/react";
import DefaultBtn from "components/ui/defaultBtn";
import React, { useEffect } from "react";

import CustomInput from "components/ui/customInput";
import { useActions } from "hooks/useActions";
import useInput from "hooks/useInput";
import { getFolders, getIsExistName } from "store/folder/folder.selectors";
import CloseIcon from "assets/image/close-green.png";
import ValidationText from "../ui/validation_text";
import useGenerateId from "hooks/useGenerateId";
import { useAddFolderMutation } from "store/api_queries/api_idea_storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";

const AddRootFolder = () => {
  const { isExistName, setIsShowAddRootFolder } = useActions();
  const [addFolder] = useAddFolderMutation();
  const [user] = useAuthState(auth);
  const folders = getFolders();
  const isExist = getIsExistName();
  const newFolderId = useGenerateId(folders);
  const hasFolder = folders?.length > 1;
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
      addFolder({
        user_id: user?.uid,
        id: newFolderId,
        parent_id: 1,
        name: folder?.name,
      });
    if (!folder?.name) {
      folderBlurHandler();
    }
    folder?.name && closeHandler();
  };

  const closeHandler = () => {
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
      flexDir={{ base: "column", sm: "row", lg: "column" }}
      alignItems={{ base: "start", lg: "center" }}
      rowGap={"24px"}
      columnGap={"24px"}
      w={"100%"}
      maxW={{ base: "100%", lg: "100%" }}
      pos={"relative"}
    >
      <CustomInput
        input={{
          id: "name",
          type: "text",
          value: folder?.name || "",
          placeholder: "Enter folder name",
        }}
        maxLength={10}
        onChange={folderChangeHandler}
        onBlur={folderBlurHandler}
      />
      <ValidationText
        isExistName={isExist}
        enteredName={folder?.name}
        isTouched={folderInputIsTouched}
        topPosition={"40px"}
        starTopPosition={"60px"}
        leftPosition={"0"}
      />

      <Flex
        w={"100%"}
        alignItems={"center"}
        justifyContent={{ base: "end", sm: "start", lg: "end" }}
        columnGap={"12px"}
      >
        <DefaultBtn title={"Add"} onClick={addNewFolderHandler} />
        {hasFolder && (
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            border={"1px solid #89b0ae"}
            borderRadius={"5px"}
            minW={"40px"}
            h={"40px"}
            cursor={"pointer"}
            onClick={closeHandler}
          >
            <Image src={CloseIcon.src} w={"40px"} alt={"Close icon"} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default AddRootFolder;
