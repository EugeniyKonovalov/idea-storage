import { Flex, Image } from "@chakra-ui/react";
import CustomInput from "components/ui/customInput";
import CustomModal from "components/ui/customModal";
import DefaultBtn from "components/ui/defaultBtn";
import { useActions } from "hooks/useActions";
import useGenerateId from "hooks/useGenerateId";
import useInput from "hooks/useInput";
import React, { useEffect } from "react";
import { getFolders, getIsExistName } from "store/folder/folder.selectors";
import { folderType } from "types/folders_types";
import { addFolderModalType, ModalType } from "types/ui_types";
import FolderValidationText from "./folder_validation_text";

const AddFolderForm: React.FC<ModalType & addFolderModalType> = ({
  isOpen,
  onClose,
  item,
  showSubfolderHandler,
}) => {
  const { isExistName, addNewFolder } = useActions();
  const isExist = getIsExistName();
  const folders = getFolders();
  const newFolderId = useGenerateId(folders);
  const {
    data: subfolder,
    setData: setSubfolder,
    changeHandler: subfolderChangehandler,
    blurHandler: subfolderBlurhandler,
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
      addNewFolder({
        id: newFolderId,
        parent_id: item?.id,
        name: subfolder?.name,
      });
    setSubfolder("");
    subfolderLeaveFocusHandler();
    showSubfolderHandler();
    onClose();
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
      <Flex
        flexDir={"column"}
        px={"24px"}
        pt={"64px"}
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
              maxlength: "20",
              value: subfolder?.name || "",
              placeholder: "Enter folder name",
            }}
            customStyles={{ h: "40px" }}
            onChange={subfolderChangehandler}
            onBlur={subfolderBlurhandler}
          />

          <FolderValidationText
            isExistName={isExist}
            folderName={subfolder?.name}
            isTouched={subfolderIsTouched}
            topPosition={"60px"}
          />
        </Flex>
        <DefaultBtn
          title="Add folder"
          customStyles={{ w: "35%", alignSelf: "flex-end" }}
          onClick={(e) => addSubfolderhandler(e, item)}
        />
      </Flex>
    </CustomModal>
  );
};

export default AddFolderForm;
