import { Flex, Image, Input, ListItem, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AppChildrensType from "types/app_props_type";
import { folderType, subFoldersType } from "types/folders_types";
import FolderIcon from "assets/image/folder.png";
import OpenFolderIcon from "assets/image/open-folder.png";
import AddFolderForm from "./add_folder_form";
import AddNoteForm from "components/notes/add_note_form";
import useGetNotes from "hooks/useGetNotes";
import SubFolderIcon from "./sub_folder_icon";
import FolderNotes from "../notes/folder_notes";
import { noteType } from "types/notes_types";
import {
  useDeleteFolderMutation,
  useEditFolderMutation,
} from "store/api_queries/api_idea_storage";
import useInput from "hooks/useInput";
import { useActions } from "hooks/useActions";
import { getCurrentNote } from "store/notes/notes.selectors";
import { getFolders } from "store/folder/folder.selectors";

const SubFolder: React.FC<AppChildrensType & subFoldersType> = ({
  item,
  children,
  childrenFolder,
}) => {
  const { setCurrentNote } = useActions();
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
  const [isEditFolder, setIsEditFolder] = useState<boolean>(false);
  const [deleteFolder] = useDeleteFolderMutation();
  const [editFolder] = useEditFolderMutation();
  const currentNote = getCurrentNote();
  const folders = getFolders();

  const {
    data: folder,
    setData: setFolder,
    changeHandler: folderChangeHandler,
  } = useInput();

  const notes: noteType[] = useGetNotes(item?.id);

  notes?.sort((a, b) => (a.id < b.id ? 1 : -1));

  const openFolderHandler = () => {
    setIsOpen(!isOpen);
  };

  const showSubfolderHandler = () => {
    setIsOpen(true);
  };

  const isEditFolderNameHandler = () => {
    setIsEditFolder(!isEditFolder);
  };

  const editFolderHandler = (event: React.FormEvent, item: folderType) => {
    event?.preventDefault();
    setIsEditFolder(false);
    editFolder({ user_id: item?.user_id, id: item?.id, folder: folder });
  };

  const deleteFolderHandler = (item: folderType) => {
    deleteFolder({ user_id: item?.user_id, id: item?.id });

    const hideCurrentNote = (id: number) => {
      const subFolders = folders?.filter(
        (f: folderType) => f?.parent_id === id
      );
      subFolders?.forEach((filteredfolder: folderType) => {
        currentNote?.folder_id === filteredfolder?.id && setCurrentNote(null);
        hideCurrentNote(filteredfolder?.id);
      });
    };
    hideCurrentNote(item?.id);

    currentNote?.folder_id === item?.id && setCurrentNote(null);
  };

  useEffect(() => {
    setFolder(item);
  }, [item]);

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
          item={item}
          showSubfolderHandler={showSubfolderHandler}
        />
      )}
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        alignItems={{ base: "start", sm: "end" }}
        justifyContent={{ base: "start", sm: "space-between" }}
        w={"100%"}
        onMouseEnter={() => setHoverFolder(true)}
        onMouseLeave={() => setHoverFolder(false)}
        borderBottom={"1px solid #62677f77"}
        minH={{ base: "73px", sm: "50px" }}
      >
        <Flex alignItems={"end"} columnGap={"4px"}>
          <Image
            src={(!isOpen ? FolderIcon : OpenFolderIcon).src}
            w={"48px"}
            alt={"folder icon"}
            cursor={"pointer"}
            onClick={openFolderHandler}
          />
          <Flex
            as={"form"}
            onSubmit={(e) => editFolderHandler(e, item)}
            maxW={"140px"}
            border={isEditFolder ? "1px solid #fff" : ""}
            h={"30px"}
            borderRadius={"5px"}
            ps={"8px"}
          >
            <Input
              maxW={"fit-content"}
              readOnly={!isEditFolder}
              fontSize={"14px"}
              fontWeight={"400"}
              id={"name"}
              variant={"unstyled"}
              maxLength={10}
              value={folder?.name || ""}
              onChange={folderChangeHandler}
            />
          </Flex>
        </Flex>
        {hoverFolder && (
          <SubFolderIcon
            item={item}
            isOpenAddNewFolder={isOpenAddNewFolder}
            isOpenAddNewNote={isOpenAddNewNote}
            deleteFolderHandler={deleteFolderHandler}
            isEditFolderNameHandler={isEditFolderNameHandler}
          />
        )}
      </Flex>
      {isOpen && (
        <>
          {notes?.length !== 0 && (
            <Flex flexDir={"column"} ml={"16px"} py={"8px"}>
              {notes?.map((item) => (
                <FolderNotes
                  key={item.id}
                  item={item}
                  isOpenAddNewNote={isOpenAddNewNote}
                />
              ))}
            </Flex>
          )}
        </>
      )}
      {isOpen && <>{children}</>}
    </ListItem>
  );
};

export default SubFolder;
