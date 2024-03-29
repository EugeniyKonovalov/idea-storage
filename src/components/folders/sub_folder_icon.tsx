import React from "react";
import AddFolderIcon from "assets/image/add-folder-white.png";
import AddDocumentIcon from "assets/image/add-document-1-white.png";
import EditFolderIcon from "assets/image/edit.png";
import DeleteFolderIcon from "assets/image/delete.png";
import { Flex, Image } from "@chakra-ui/react";
import { subFoldersIconType } from "types/folders_types";
import { useActions } from "hooks/useActions";

const SubFolderIcon: React.FC<subFoldersIconType> = ({
  item,
  isOpenAddNewFolder,
  isOpenAddNewNote,
  deleteFolderHandler,
  isEditFolderNameHandler,
}) => {
  const { isNoteForm } = useActions();

  const openAddNewNoteFormHandler = () => {
    isOpenAddNewNote();
    isNoteForm(true);
  };

  return (
    <Flex alignItems={"center"} columnGap={"8px"} alignSelf={{ base: "end" }}>
      <Image
        src={AddFolderIcon.src}
        w={"24px"}
        alt={"folder icon"}
        cursor={"pointer"}
        title={"Add folder"}
        onClick={isOpenAddNewFolder}
      />
      <Image
        src={AddDocumentIcon.src}
        w={"18px"}
        alt={"document icon"}
        cursor={"pointer"}
        title={"Add document"}
        onClick={openAddNewNoteFormHandler}
      />
      <Image
        src={EditFolderIcon.src}
        w={"18px"}
        alt={"folder icon"}
        cursor={"pointer"}
        title={"Edit name"}
        onClick={isEditFolderNameHandler}
      />
      <Image
        src={DeleteFolderIcon.src}
        w={"18px"}
        alt={"folder icon"}
        cursor={"pointer"}
        title={"Remove folder"}
        onClick={() => deleteFolderHandler(item)}
      />
    </Flex>
  );
};

export default SubFolderIcon;
