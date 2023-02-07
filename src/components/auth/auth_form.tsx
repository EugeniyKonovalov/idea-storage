import {
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import CustomInput from "components/ui/customAuthInput";
import DefaultBtn from "components/ui/defaultBtn";
import useAppRouter from "hooks/useAppRouter";
import React from "react";
import SignInImg from "assets/image/graduation.png";
import SignUpImg from "assets/image/book.png";
import { inter_400_18_25, inter_600_18_25 } from "../../../styles/fontStyles";
import useInput from "hooks/useInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";
import { userType } from "types/auth_types";
import { getIsShowPassword } from "store/auth/auth.selectors";
import { useActions } from "hooks/useActions";

const Span = chakra("span", {});

const AuthForm: React.FC = () => {
  const { router } = useAppRouter();
  const { signUp, signIn } = useActions();
  const isSignUp = router.pathname === "/sign_up";
  const isShowPassword = getIsShowPassword();
  const [user] = useAuthState(auth);
  const { data: authData, changeHandler: authChangeHandler } = useInput();

  const signInTabHandler = () => {
    router.push("/sign_in");
  };
  const signUpTabHandler = () => {
    router.push("/sign_up");
  };

  const submitHandler = async () => {
    const signUpOptions: userType = {
      name: `${authData?.first_name} ${authData?.last_name}`,
      email: authData?.email,
      password: authData?.password,
    };
    const signInOptions: userType = {
      email: authData?.email,
      password: authData?.password,
    };

    isSignUp ? signUp(signUpOptions) : signIn(signInOptions);
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"calc(100vh - 140px)"}
    >
      <Flex
        flexDir={"column"}
        h={"60%"}
        px={"32px"}
        pt={"24px"}
        bg={!isSignUp ? "#505568" : "#89b0ae"}
        transition={"all 0.07s"}
        minW={"350px"}
      >
        <Heading as={"h2"}>{isSignUp ? "Sign Up" : "Sign In"}</Heading>
        <FormControl
          display={"flex"}
          flexDir={"column"}
          pt={"12px"}
          rowGap={"8px"}
        >
          {isSignUp && (
            <CustomInput
              label="First Name"
              input={{
                id: "first_name",
                type: "text",
                value: authData?.first_name || "",
                placeholder: "Enter first name",
              }}
              onChange={authChangeHandler}
            />
          )}
          {isSignUp && (
            <CustomInput
              label="Last Name"
              input={{
                id: "last_name",
                type: "text",
                value: authData?.last_name || "",
                placeholder: "Enter last name",
              }}
              onChange={authChangeHandler}
            />
          )}
          <CustomInput
            label="Email"
            input={{
              id: "email",
              type: "text",
              value: authData?.email || "",
              placeholder: "Enter email",
            }}
            onChange={authChangeHandler}
          />
          <CustomInput
            label="Password"
            input={{
              id: "password",
              type: !isShowPassword ? "password" : "text",
              value: authData?.password || "",
              placeholder: "Enter password",
            }}
            onChange={authChangeHandler}
          />
          <DefaultBtn
            title={isSignUp ? "Sign Up" : "Sign In"}
            customStyles={{ bg: !isSignUp ? "#89b0ae" : "#505568", mt: "28px" }}
            onClick={submitHandler}
          />
        </FormControl>
      </Flex>
      <Flex
        flexDir={"column"}
        h={"60%"}
        px={"32px"}
        pt={"24px"}
        bg={!isSignUp ? "#89b0ae" : "#505568"}
        transition={"all 0.07s"}
        w={"350px"}
        rowGap={"48px"}
        justifyContent={"center"}
      >
        <Image
          w={"286px"}
          h={"204px"}
          objectFit={"contain"}
          src={!isSignUp ? SignInImg.src : SignUpImg.src}
          alt={"people conect"}
        />
        <Flex alignItems={"center"} columnGap={"8px"}>
          <Text {...inter_400_18_25} textAlign={"center"}>
            {isSignUp ? "You have an account? " : "Don't have an acount? "}
          </Text>
          <Button
            variant={"unstyled"}
            {...inter_600_18_25}
            color={"#FFBE55"}
            textDecoration={"underline"}
            cursor={"pointer"}
            _hover={{ transform: "translate(0, -2px)" }}
            transition={"all 0.3s"}
            onClick={() => {
              !isSignUp ? signUpTabHandler() : signInTabHandler();
            }}
          >
            {!isSignUp ? "Sign Up!" : "Sign In!"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
