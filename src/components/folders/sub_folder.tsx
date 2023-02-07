import { Flex, Image, ListItem, Text, useDisclosure } from "@chakra-ui/react";
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

const SubFolder: React.FC<AppChildrensType & subFoldersType> = ({
  item,
  children,
}) => {
  const { router } = useAppRouter();
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
    router.push(`?folder=${item?.name?.toLowerCase()?.split(" ")?.join("_")}`);
  };
  const showSubfolderHandler = () => {
    setIsOpen(true);
  };

  const notes: noteType[] = useGetNotes(item?.id);

  notes?.sort((a, b) => (a.id < b.id ? 1 : -1));

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
          <SubFolderIcon
            isOpenAddNewFolder={isOpenAddNewFolder}
            isOpenAddNewNote={isOpenAddNewNote}
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
