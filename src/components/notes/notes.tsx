import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import DocumentIcon from "assets/image/document-file.png";
import { noteType } from "types/notes_types";
import { inter_300_14_18 } from "../../../styles/fontStyles";
import useAppRouter from "hooks/useAppRouter";
import useGetFolders from "hooks/useGetFolders";
import NoteDetail from "./note_detail";

const Notes: React.FC = () => {
  return (
    <Flex p={"32px 64px"}>
      <Flex
        w={"100%"}
        minW={"320px"}
        p={"12px"}
        h={"calc(100vh - 141px - 64px)"}
        border={"1px solid #89b0ae"}
        borderRadius={"5px"}
        flexDir={"column"}
        rowGap={"12px"}
      >
        <NoteDetail />
      </Flex>
    </Flex>
  );
};

export default Notes;
