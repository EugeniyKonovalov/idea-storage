import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import EditFolderIcon from "assets/image/edit.png";
import DeleteFolderIcon from "assets/image/delete.png";
import { folderNotesIconsType } from "types/notes_types";

const FolderNotesIcon: React.FC<folderNotesIconsType> = ({
  item,
  openEditNoteHandler,
  deleteNoteHandler,
}) => {
  return (
    <Flex alignItems={"center"} columnGap={"8px"}>
      <Image
        src={EditFolderIcon.src}
        w={"18px"}
        alt={"folder icon"}
        cursor={"pointer"}
        title={"Edit title"}
        onClick={(event) => openEditNoteHandler(event, item)}
      />
      <Image
        src={DeleteFolderIcon.src}
        w={"18px"}
        alt={"folder icon"}
        cursor={"pointer"}
        title={"Remove note"}
        onClick={(event) => deleteNoteHandler(event, item)}
      />
    </Flex>
  );
};

export default FolderNotesIcon;
