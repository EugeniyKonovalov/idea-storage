import { Text } from "@chakra-ui/react";
import useAppRouter from "hooks/useAppRouter";
import React from "react";
import { authValidationTextType } from "types/ui_types";

const AuthValidationText: React.FC<authValidationTextType> = ({ content }) => {
  const { router } = useAppRouter();
  const isSignUp = router.pathname === "/sign_up";
  return (
    <Text
      w={"100%"}
      pos={"absolute"}
      textAlign={"end"}
      fontSize={"14px"}
      fontWeight={"300"}
      color={isSignUp ? "#2c2f3a" : "#FFBE55"}
    >
      {content}
    </Text>
  );
};

export default AuthValidationText;
