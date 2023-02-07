import { Avatar, Flex, Heading, Image, Text } from "@chakra-ui/react";
import LogoImg from "assets/image/notes-icon.png";
import DefaultBtn from "components/ui/defaultBtn";
import SearchInput from "components/ui/searchInput";
import { inter_400_18_25, inter_700_32_48 } from "../../../styles/fontStyles";
import { signOut } from "firebase/auth";
import { useActions } from "hooks/useActions";
import useAppRouter from "hooks/useAppRouter";
import React from "react";
import { getIsLoggedIn } from "store/auth/auth.selectors";
import { auth } from "../../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import UserIcon from "assets/image/user.png";

const Header: React.FC = () => {
  const { router } = useAppRouter();
  const { logOutState } = useActions();
  const isLoggedIn = getIsLoggedIn();
  const [user] = useAuthState(auth);

  const openLoginHandler = () => {
    router.push("/sign_in");
  };

  const toHomePageHandler = () => {
    router.push(!isLoggedIn ? "/" : "/folders");
  };

  const logOutHandler = () => {
    logOutState();
    signOut(auth);
  };

  const submitHandler = (event: React.FormEvent) => {
    event?.preventDefault();
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
              {isLoggedIn && <SearchInput onSubmit={submitHandler} />}
              {isLoggedIn && (
                <Flex
                  border={"1px solid #89b0ae"}
                  borderRadius={"5px"}
                  columnGap={"12px"}
                  px={"12px"}
                  minW={"fit-content"}
                  h={"40px"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Image src={UserIcon.src} w={"32px"} alt={"User icon"} />
                  <Text {...inter_400_18_25}>
                    {user?.displayName?.split(" ")[0]}
                  </Text>
                </Flex>
              )}
              {!isLoggedIn && (
                <DefaultBtn title="Login" onClick={openLoginHandler} />
              )}
              {isLoggedIn && (
                <DefaultBtn title="Logout" onClick={logOutHandler} />
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
