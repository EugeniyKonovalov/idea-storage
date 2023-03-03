import React from "react";
import { Flex } from "@chakra-ui/react";
import NoteDetail from "./note_detail";

const Notes: React.FC = () => {
  return (
    <Flex p={{ base: "32px 16px", lg: "32px 64px" }}>
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
