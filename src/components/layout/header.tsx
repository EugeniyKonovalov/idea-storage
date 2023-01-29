import { Flex, Heading, Image } from "@chakra-ui/react";
import LogoImg from "assets/image/notes-icon.png";
import DefaultBtn from "components/ui/defaultBtn";
import SearchInput from "components/ui/searchInput";
import useAppRouter from "hooks/useAppRouter";
import React from "react";

import { inter_700_32_48 } from "../../../styles/fontStyles";

const Header: React.FC = () => {
  const { router } = useAppRouter();

  const openLoginHandler = () => {
    router.push("/sign_in");
  };

  const toHomePageHandler = () => {
    router.push("/");
  };

  return (
    <>
      <Flex
        pos={"fixed"}
        top={"0"}
        left={"0"}
        w={"100%"}
        h={"70px"}
        bg={"linear-gradient(to right,#89b0ae  , #555B6E )"}
        borderBottom={"1px solid #faf9f9"}
        zIndex={100}
      >
        <Flex
          w={"100%"}
          m={"0 auto"}
          maxW={"1440px"}
          alignItems={"center"}
          px={"32px"}
          justifyContent={"space-between"}
        >
          <Flex
            alignItems={"center"}
            columnGap={"32px"}
            cursor={"pointer"}
            onClick={toHomePageHandler}
          >
            <Image src={LogoImg.src} w={"50px"} h={"50px"} alt="Logo" />
            <Heading {...inter_700_32_48}>Idea Storage</Heading>
          </Flex>
          {router.pathname !== "/login" && (
            <Flex alignItems={"center"} columnGap={"24px"}>
              <SearchInput />
              <DefaultBtn title="Login" onClick={openLoginHandler} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
