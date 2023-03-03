import { Flex, Image, Text } from "@chakra-ui/react";
import DefaultBtn from "components/ui/defaultBtn";
import useAppRouter from "hooks/useAppRouter";
import { useAuthState } from "react-firebase-hooks/auth";
import { getIsLoggedIn } from "store/auth/auth.selectors";
import { mobileMenuType } from "types/ui_types";
import { auth } from "../../../firebase.config";
import UserIcon from "assets/image/user-icon-grey.png";

const MobileMenu: React.FC<mobileMenuType> = ({
  logOutHandler,
  openLoginHandler,
  isOpen,
}) => {
  const { router } = useAppRouter();
  const isLoggedIn = getIsLoggedIn();
  const [user] = useAuthState(auth);

  return (
    <Flex
      w={{ base: "100%" }}
      flexDir={"column"}
      zIndex={100}
      pos="fixed"
      top="60px"
      left="0"
      h={"calc(100vh - 59px)"}
      bg={"linear-gradient(to right,#89b0ae  , #555B6E )"}
      py={"40px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      opacity={isOpen ? "1" : "0"}
      visibility={isOpen ? "visible" : "hidden"}
      transition="all 1.6s ease-in-out"
    >
      <Flex flexDir={"column"} alignItems={"center"} gap={"20px"}>
        <>
          {router.pathname !== "/login" && (
            <Flex alignItems={"center"} columnGap={"24px"}>
              {isLoggedIn && (
                <Flex
                  border={"1px solid #555B6E"}
                  borderRadius={"5px"}
                  columnGap={"12px"}
                  px={"12px"}
                  minW={"fit-content"}
                  h={"40px"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Image src={UserIcon.src} w={"32px"} alt={"User icon"} />
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
      </Flex>
    </Flex>
  );
};

export default MobileMenu;
