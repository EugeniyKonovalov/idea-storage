import React, { useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import DocumentIcon from "assets/image/document-file.png";
import EditFolderIcon from "assets/image/edit.png";
import DeleteFolderIcon from "assets/image/delete.png";
import { noteType } from "types/notes_types";
import { inter_300_14_18 } from "../../../styles/fontStyles";
import useAppRouter from "hooks/useAppRouter";
import { useActions } from "hooks/useActions";

const FolderNotes: React.FC<{ item: noteType }> = ({ item }) => {
  const { router } = useAppRouter();
  const { setCurrentNote } = useActions();
  const [hoverNote, setHoverNote] = useState<boolean>(false);
  const selectedNote =
    router.query.note === item?.title?.toLowerCase()?.split(" ")?.join("_");

  const openDetailHandler = (note: noteType) => {
    setCurrentNote(note);
    router.push(
      `?folder=${router.query.folder}&note=${item?.title
        ?.toLowerCase()
        ?.split(" ")
        ?.join("_")}`
    );
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
        <Text {...inter_300_14_18}>{item?.title}</Text>
      </Flex>
      {hoverNote && (
        <Flex alignItems={"center"} columnGap={"8px"}>
          <Image
            src={EditFolderIcon.src}
            w={"18px"}
            alt={"folder icon"}
            cursor={"pointer"}
            title={"Edit title"}
          />
          <Image
            src={DeleteFolderIcon.src}
            w={"18px"}
            alt={"folder icon"}
            cursor={"pointer"}
            title={"Remove note"}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default FolderNotes;
