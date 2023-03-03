import { Flex, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";
import LogoImg from "assets/image/notes-icon.png";
import DefaultBtn from "components/ui/defaultBtn";
import { signOut } from "firebase/auth";
import { useActions } from "hooks/useActions";
import useAppRouter from "hooks/useAppRouter";
import React, { useState } from "react";
import { getIsLoggedIn } from "store/auth/auth.selectors";
import { auth } from "../../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import UserIcon from "assets/image/user.png";
import MobileMenuIcon from "assets/svg/mobile-menu.svg";
import CloseMobileMenu from "assets/svg/close-mobile-menu.svg";
import MobileMenu from "./mobile_menu";

const Header: React.FC = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 991px)");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
            columnGap={{ base: "18px", sm: "32px" }}
            cursor={"pointer"}
            onClick={toHomePageHandler}
          >
            <Image src={LogoImg.src} w={"50px"} h={"50px"} alt="Logo" />
            <Heading fontSize={{ base: "28px", sm: "32px" }} fontWeight={"700"}>
              Idea Store
            </Heading>
          </Flex>
          {!isSmallScreen && (
            <>
              {router.pathname !== "/sign_in" &&
                router.pathname !== "/sign_up" && (
                  <Flex alignItems={"center"} columnGap={"24px"}>
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
                        <Image
                          src={UserIcon.src}
                          w={"32px"}
                          alt={"User icon"}
                        />
                        <Text fontSize={"18px"} fontWeight={"400"}>
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
            </>
          )}
          {isSmallScreen &&
            router.pathname !== "/sign_in" &&
            router.pathname !== "/sign_up" && (
              <Flex alignItems={"center"} flexDir={"column"}>
                {!isOpen ? (
                  <Flex
                    cursor={"pointer"}
                    onClick={() => setIsOpen(true)}
                    transform={isOpen ? "rotate(360deg)" : ""}
                    transition="all 1.2s ease-in"
                  >
                    <MobileMenuIcon />
                  </Flex>
                ) : (
                  <Flex
                    cursor={"pointer"}
                    onClick={() => setIsOpen(false)}
                    transform={isOpen ? "rotate(360deg)" : ""}
                    transition="all 0.6s ease-in-out"
                  >
                    <CloseMobileMenu />
                  </Flex>
                )}
                {
                  <MobileMenu
                    logOutHandler={logOutHandler}
                    openLoginHandler={openLoginHandler}
                    isOpen={isOpen}
                  />
                }
              </Flex>
            )}
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
