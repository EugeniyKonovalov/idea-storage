import { Flex, Image, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import AppChildrensType from "types/app_props_type";
import { subFoldersType } from "types/folders_types";
import { inter_400_14_18 } from "../../../styles/fontStyles";
import FolderIcon from "assets/image/folder.png";
import OpenFolderIcon from "assets/image/open-folder.png";
import AddFolderIcon from "assets/image/add-folder-white.png";
import AddDocumentIcon from "assets/image/add-document-1-white.png";
import EditFolderIcon from "assets/image/edit.png";
import DeleteFolderIcon from "assets/image/delete.png";
import AddFolderForm from "./add_folder_form";
import AddNoteForm from "components/notes/add_note_form";
import useGetNotes from "hooks/useGetNotes";

const SubFolder: React.FC<AppChildrensType & subFoldersType> = ({
  item,
  children,
}) => {
  const {
    isOpen: isAddNewFolder,
    onOpen: isOpenAddNewFolder,
    onClose: isCloseAddNewFolder,
  } = useDisclosure();
  const {
    isOpen: isAddNewNote,
    onOpen: isOpenAddNewNote,
    onClose: isCloseAddNewNote,
  } = useDisclosure();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoverFolder, setHoverFolder] = useState<boolean>(false);

  const openFolderHandler = () => {
    setIsOpen(!isOpen);
  };
  const showSubfolderHandler = () => {
    setIsOpen(true);
  };

  const notes = useGetNotes(item?.id);
  console.log(notes);
  return (
    <ListItem>
      {isAddNewFolder && (
        <AddFolderForm
          isOpen={isAddNewFolder}
          onClose={isCloseAddNewFolder}
          item={item}
          showSubfolderHandler={showSubfolderHandler}
        />
      )}
      {isAddNewNote && (
        <AddNoteForm
          isOpen={isAddNewNote}
          onClose={isCloseAddNewNote}
          folder_id={item?.id}
        />
      )}
      <Flex
        alignItems={"end"}
        justifyContent={"space-between"}
        w={"100%"}
        onMouseEnter={() => setHoverFolder(true)}
        onMouseLeave={() => setHoverFolder(false)}
      >
        <Flex alignItems={"end"} columnGap={"12px"}>
          <Image
            src={(!isOpen ? FolderIcon : OpenFolderIcon).src}
            w={"48px"}
            alt={"folder icon"}
            cursor={"pointer"}
            onClick={openFolderHandler}
          />
          <Text {...inter_400_14_18}>{item.name}</Text>
        </Flex>
        {hoverFolder && (
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
        )}
      </Flex>
      {isOpen && (
        <>
          {notes?.map((item) => (
            <Text key={item.id}>{item?.title}</Text>
          ))}
        </>
      )}
      {isOpen && <>{children}</>}
    </ListItem>
  );
};

export default SubFolder;
