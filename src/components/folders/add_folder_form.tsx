import { Flex, Text } from "@chakra-ui/react";
import CustomInput from "components/ui/customInput";
import CustomModal from "components/ui/customModal";
import DefaultBtn from "components/ui/defaultBtn";
import { useActions } from "hooks/useActions";
import useGenerateId from "hooks/useGenerateId";
import useInput from "hooks/useInput";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAddFolderMutation } from "store/api_queries/api_idea_storage";
import { getFolders, getIsExistName } from "store/folder/folder.selectors";
import { folderType } from "types/folders_types";
import { addModalType, ModalType } from "types/ui_types";
import { auth } from "../../../firebase.config";
import ValidationText from "../ui/validation_text";

const AddFolderForm: React.FC<ModalType & addModalType> = ({
  isOpen,
  onClose,
  item,
  showSubfolderHandler,
}) => {
  const { isExistName } = useActions();
  const isExist = getIsExistName();
  const [user] = useAuthState(auth);
  const [addFolder] = useAddFolderMutation();
  const folders = getFolders();
  const newFolderId = useGenerateId(folders);
  const {
    data: subfolder,
    setData: setSubfolder,
    changeHandler: subfolderChangeHandler,
    blurHandler: subfolderBlurHandler,
    isTouched: subfolderIsTouched,
    leaveFocusHandler: subfolderLeaveFocusHandler,
  } = useInput();

  const addSubfolderhandler = (event: React.FormEvent, item: folderType) => {
    event.preventDefault();
    if (folders?.map((item) => item.name)?.includes(subfolder?.name)) {
      isExistName(true);
      return;
    }

    isExistName(false);
    subfolder?.name &&
      addFolder({
        user_id: user?.uid,
        id: newFolderId,
        parent_id: item?.id,
        name: subfolder?.name,
      });
    if (subfolder?.name) {
      setSubfolder("");
      subfolderLeaveFocusHandler();
      showSubfolderHandler();
      onClose();
    }
  };

  useEffect(() => {
    isExistName(
      folders?.map((item) => item.name)?.includes(subfolder?.name)
        ? true
        : false
    );
  }, [subfolder?.name]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Text
        fontSize={"18px"}
        fontWeight={"400"}
        color={"#89b0ae"}
        mt={"12px"}
        ml={"24px"}
      >
        Add subfolder
      </Text>
      <Flex
        flexDir={"column"}
        px={"24px"}
        pt={"24px"}
        pb={"24px"}
        rowGap={"48px"}
      >
        <Flex
          as={"form"}
          onSubmit={(e) => addSubfolderhandler(e, item)}
          alignItems={"center"}
          w={"100%"}
          pos={"relative"}
        >
          <CustomInput
            input={{
              id: "name",
              type: "text",
              value: subfolder?.name || "",
              placeholder: "Enter folder name",
            }}
            maxLength={10}
            customStyles={{ h: "40px" }}
            onChange={subfolderChangeHandler}
            onBlur={subfolderBlurHandler}
          />

          <ValidationText
            isExistName={isExist}
            enteredName={subfolder?.name}
            isTouched={subfolderIsTouched}
            topPosition={"40px"}
            starTopPosition={"60px"}
            leftPosition={"0"}
          />
        </Flex>
        <DefaultBtn
          title="Add"
          customStyles={{ w: "35%", alignSelf: "flex-end" }}
          onClick={(e) => addSubfolderhandler(e, item)}
        />
      </Flex>
    </CustomModal>
  );
};

export default AddFolderForm;
