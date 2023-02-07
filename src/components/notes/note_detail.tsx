import React, { useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import {
  inter_400_16_22,
  inter_400_18_25,
  inter_600_24_32,
} from "../../../styles/fontStyles";
import { getCurrentNote } from "store/notes/notes.selectors";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import useAppRouter from "hooks/useAppRouter";
import { useActions } from "hooks/useActions";
const NoteDetail: React.FC = () => {
  const { router } = useAppRouter();
  const { setCurrentNote } = useActions();
  const [user] = useAuthState(auth);
  const note = getCurrentNote();

  useEffect(() => {
    router.query.note !== note?.title?.toLowerCase()?.split(" ")?.join("_") &&
      setCurrentNote(null);
  }, []);

  return (
    <Flex
      flexDir={"column"}
      pt={"32px"}
      pb={"24px"}
      ps={"32px"}
      pe={"12px"}
      bg={"#faf9f9"}
      color={"#2c2f3a"}
      h={"100%"}
      borderRadius={"5px"}
      boxShadow={"0px 0px 10px #000000"}
      w={"100%"}
      rowGap={"24px"}
      justifyContent={"space-between"}
    >
      {note ? (
        <>
          <Flex flexDir={"column"} h={"95%"}>
            <Heading
              as={"h4"}
              {...inter_600_24_32}
              textAlign={"center"}
              me={"20px"}
            >
              {note?.title}
            </Heading>
            <Flex flexDir={"column"} overflowY={"auto"} my={"24px"} pe={"20px"}>
              <Text {...inter_400_18_25}>{note?.content}</Text>
            </Flex>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"end"}>
            <Text {...inter_400_16_22} color={"#62677f77"}>
              Note created by {user?.displayName?.split(" ")[0]}
            </Text>
          </Flex>
        </>
      ) : (
        <Flex alignItems={"center"} justifyContent={"center"} h={"100%"}>
          <Text>Not selected note</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default NoteDetail;
