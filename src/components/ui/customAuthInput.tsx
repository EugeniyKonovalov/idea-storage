import { Box, Flex, FormLabel, Grid, Input } from "@chakra-ui/react";
import { useState } from "react";
import { InputsType } from "types/ui_types";
import EyeClose from "assets/svg/eye-close.svg";
import EyeOpen from "assets/svg/eye-open.svg";
import { useActions } from "hooks/useActions";
import { getIsShowPassword } from "store/auth/auth.selectors";

const CustomAuthInput: React.FC<InputsType> = ({ label, input, onChange }) => {
  const { showPassword } = useActions();
  const isShowPassword = getIsShowPassword();

  return (
    <Flex flexDir={"column"}>
      <FormLabel>{label}</FormLabel>
      <Flex
        as={"form"}
        border={"1px solid #ced4da"}
        borderRadius={"5px"}
        h={"40px"}
        ps={"16px"}
      >
        <Input
          autoComplete="off"
          variant={"unstyled"}
          _placeholder={{ color: "#ced4da" }}
          _focus={{ boxShadow: "none" }}
          {...input}
          onChange={onChange}
        />
        {input?.id === "password" && (
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            me={"20px"}
            onClick={() => showPassword()}
          >
            {!isShowPassword ? <EyeClose /> : <EyeOpen />}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CustomAuthInput;
