import { Flex, FormLabel, Input } from "@chakra-ui/react";
import { InputsType } from "types/ui_types";
import EyeClose from "assets/svg/eye-close.svg";
import EyeOpen from "assets/svg/eye-open.svg";
import { useActions } from "hooks/useActions";
import { getIsShowPassword } from "store/auth/auth.selectors";
import useAppRouter from "hooks/useAppRouter";

const CustomAuthInput: React.FC<InputsType> = ({
  label,
  input,
  onChange,
  onBlur,
  hasError,
}) => {
  const { router } = useAppRouter();
  const { showPassword } = useActions();
  const isShowPassword = getIsShowPassword();
  const isSignUp = router.pathname === "/sign_up";

  return (
    <Flex flexDir={"column"}>
      <FormLabel>{label}</FormLabel>
      <Flex
        borderWidth={"1px"}
        borderStyle={"solid"}
        borderColor={hasError ? (isSignUp ? "#2c2f3a" : "#FFBE55") : "#ced4da"}
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
          onBlur={onBlur}
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
