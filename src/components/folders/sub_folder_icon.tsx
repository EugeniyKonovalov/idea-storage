import React from "react";
import AddFolderIcon from "assets/image/add-folder-white.png";
import AddDocumentIcon from "assets/image/add-document-1-white.png";
import EditFolderIcon from "assets/image/edit.png";
import DeleteFolderIcon from "assets/image/delete.png";
import { Flex, Image } from "@chakra-ui/react";
import { subFoldersIconType } from "types/folders_types";

const SubFolderIcon: React.FC<subFoldersIconType> = ({
  isOpenAddNewFolder,
  isOpenAddNewNote,
}) => {
  return (
    <Flex alignItems={"center"} columnGap={"8px"}>
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
        onClick={isOpenAddNewNote}
      />
      <Image
        src={EditFolderIcon.src}
        w={"18px"}
        alt={"folder icon"}
        cursor={"pointer"}
        title={"Edit name"}
      />
      <Image
        src={DeleteFolderIcon.src}
        w={"18px"}
        alt={"folder icon"}
        cursor={"pointer"}
        title={"Remove folder"}
      />
    </Flex>
  );
};

export default SubFolderIcon;
