import React from "react";
import { Flex, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { getCurrentNote } from "store/notes/notes.selectors";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import { useActions } from "hooks/useActions";
import { inter } from "pages/_app";
import BackArrow from "assets/image/back-arrow2.png";

const NoteDetail: React.FC = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 991px)");
  const { setIsShowMobileNote } = useActions();
  const [user] = useAuthState(auth);
  const note = getCurrentNote();

  return (
    <Flex
      flexDir={"column"}
      pt={{ base: "8px", lg: "32px" }}
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
      pos={"relative"}
    >
      {isSmallScreen && (
        <Flex
          pos={"absolute"}
          top={"10px"}
          w={"fit-content"}
          cursor={"pointer"}
          onClick={() => setIsShowMobileNote(false)}
        >
          <Image src={BackArrow.src} w={"36px"} alt={"left arrow"} />
        </Flex>
      )}
      {note ? (
        <>
          <Flex flexDir={"column"} h={"95%"}>
            <Heading
              as={"h4"}
              fontSize={"24px"}
              fontWeight={"600"}
              textAlign={"center"}
              me={"20px"}
            >
              {note?.title}
            </Heading>
            <Flex flexDir={"column"} overflowY={"auto"} my={"24px"} pe={"20px"}>
              <pre className={inter.className}>{note?.content}</pre>
            </Flex>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"end"}>
            <Text fontSize={"16px"} fontWeight={"400"} color={"#62677f77"}>
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
