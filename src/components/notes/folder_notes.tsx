import React, { useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import DocumentIcon from "assets/image/document-file.png";
import EditFolderIcon from "assets/image/edit.png";
import DeleteFolderIcon from "assets/image/delete.png";
import { noteType } from "types/notes_types";
import { useActions } from "hooks/useActions";
import { useDeleteNoteMutation } from "store/api_queries/api_idea_storage";
import { getCurrentNote } from "store/notes/notes.selectors";

const FolderNotes: React.FC<{
  item: noteType;
  isOpenAddNewNote: () => void;
}> = ({ item, isOpenAddNewNote }) => {
  const {
    setCurrentNote,
    isEditNote,
    setEditNote,
    isNoteForm,
    setIsShowMobileNote,
  } = useActions();
  const [deleteNote] = useDeleteNoteMutation();
  const [hoverNote, setHoverNote] = useState<boolean>(false);
  const currentNote = getCurrentNote();
  const selectedNote = currentNote?.title === item?.title;

  const openDetailHandler = (note: noteType) => {
    setCurrentNote(note);
    setIsShowMobileNote(true);
  };

  const openEditNoteHandler = (note: noteType) => {
    isEditNote(true);
    isNoteForm(true);
    isOpenAddNewNote();
    setEditNote(note);
  };

  const deleteNoteHandler = (event: React.MouseEvent, note: noteType) => {
    event?.stopPropagation();
    deleteNote({
      user_id: note?.user_id,
      folder_id: note?.folder_id,
      note_id: note?.id,
    });
    currentNote?.title === note?.title && setCurrentNote(null);
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      columnGap={"8px"}
      borderRadius={"5px"}
      cursor={"pointer"}
      _hover={{ bg: "#62939022" }}
      bg={selectedNote ? "#2c2f3a55" : ""}
      p={"4px"}
      onClick={() => openDetailHandler(item)}
      onMouseEnter={() => setHoverNote(true)}
      onMouseLeave={() => setHoverNote(false)}
    >
      <Flex alignItems={"center"} columnGap={"8px"}>
        <Image src={DocumentIcon.src} w={"28px"} alt={"Document icon"} />
        <Text fontSize={"14px"} fontWeight={"300"}>
          {item?.title}
        </Text>
      </Flex>
      {hoverNote && (
        <Flex alignItems={"center"} columnGap={"8px"}>
          <Image
            src={EditFolderIcon.src}
            w={"18px"}
            alt={"folder icon"}
            cursor={"pointer"}
            title={"Edit title"}
            onClick={() => openEditNoteHandler(item)}
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
      )}
    </Flex>
  );
};

export default FolderNotes;
