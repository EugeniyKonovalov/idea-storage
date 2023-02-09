import {
  Flex,
  Image,
  Input,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AppChildrensType from "types/app_props_type";
import { subFoldersType } from "types/folders_types";
import { inter_400_14_18 } from "../../../styles/fontStyles";
import FolderIcon from "assets/image/folder.png";
import OpenFolderIcon from "assets/image/open-folder.png";
import AddFolderForm from "./add_folder_form";
import AddNoteForm from "components/notes/add_note_form";
import useGetNotes from "hooks/useGetNotes";
import SubFolderIcon from "./sub_folder_icon";
import FolderNotes from "../notes/folder_notes";
import { noteType } from "types/notes_types";
import useAppRouter from "hooks/useAppRouter";
import {
  useDeleteFolderMutation,
  useEditFolderMutation,
} from "store/api_queries/api_idea_storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import AddRootFolder from "./add_root_folder";
import useInput from "hooks/useInput";

const SubFolder: React.FC<AppChildrensType & subFoldersType> = ({
  item,
  children,
}) => {
  const { router } = useAppRouter();
  const [user] = useAuthState(auth);
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

  const {
    data: folder,
    setData: setFolder,
    changeHandler: folderChangeHandler,
  } = useInput();

  const openFolderHandler = () => {
    setIsOpen(!isOpen);
    router.push(`?folder=${item?.name?.toLowerCase()?.split(" ")?.join("_")}`);
  };

  const showSubfolderHandler = () => {
    setIsOpen(true);
  };

  const notes: noteType[] = useGetNotes(item?.id);

  notes?.sort((a, b) => (a.id < b.id ? 1 : -1));

  const isEditFolderNameHandler = () => {
    setIsEditFolder(!isEditFolder);
  };

  const editFolderHandler = (event: React.FormEvent, folder_id: number) => {
    event?.preventDefault();
    setIsEditFolder(false);
    editFolder({ user_id: user?.uid, id: folder_id, folder: folder });
  };

  const deleteFolderHandler = (folder_id: number) => {
    deleteFolder({ user_id: user?.uid, id: folder_id });
  };

  useEffect(() => {
    setFolder(item);
  }, [item]);

  useEffect(() => {
    router.query.folder === item?.name?.toLowerCase()?.split(" ")?.join("_") &&
      setIsOpen(true);
  }, []);

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
        alignItems={"end"}
        justifyContent={"space-between"}
        w={"100%"}
        onMouseEnter={() => setHoverFolder(true)}
        onMouseLeave={() => setHoverFolder(false)}
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
            onSubmit={(e) => editFolderHandler(e, item?.id)}
            w={"fit-content"}
            border={isEditFolder ? "1px solid #fff" : ""}
            h={"30px"}
            borderRadius={"5px"}
            ps={"8px"}
          >
            <Input
              readOnly={!isEditFolder}
              {...inter_400_14_18}
              id={"name"}
              variant={"unstyled"}
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
                <FolderNotes key={item.id} item={item} />
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
