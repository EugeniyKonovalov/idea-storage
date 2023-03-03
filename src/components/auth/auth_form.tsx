import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import CustomAuthInput from "components/ui/customAuthInput";
import DefaultBtn from "components/ui/defaultBtn";
import useAppRouter from "hooks/useAppRouter";
import SignInImg from "assets/image/graduation.png";
import SignUpImg from "assets/image/book.png";
import { userType } from "types/auth_types";
import { getIsShowPassword } from "store/auth/auth.selectors";
import { useActions } from "hooks/useActions";
import useAuthInput from "hooks/useAuthInput";
import AuthValidationText from "components/ui/auth_validation_text";

const AuthForm: React.FC = () => {
  const [isTablet] = useMediaQuery("(max-width: 768px)");
  const { router } = useAppRouter();
  const { signUp, signIn } = useActions();
  const isSignUp = router.pathname === "/sign_up";
  const isShowPassword = getIsShowPassword();

  const emailFormat = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const isEmail = (value: string) => emailFormat.test(value);
  const isPasswordLength = (value: string) => value?.trim()?.length >= 6;
  const isNotEmpty = (value: string) => value?.trim() !== "";

  const {
    value: enteredFirstName,
    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
  } = useAuthInput(isNotEmpty);
  const {
    value: enteredLastName,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
  } = useAuthInput(isNotEmpty);
  const {
    value: enteredEmail,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
  } = useAuthInput(isEmail);
  const {
    value: enteredPassword,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValid: passwordIsValid,
  } = useAuthInput(isPasswordLength);

  const signInTabHandler = () => {
    router.push("/sign_in");
  };

  const signUpTabHandler = () => {
    router.push("/sign_up");
  };

  const formBlurHandler = () => {
    firstNameBlurHandler();
    lastNameBlurHandler();
    emailBlurHandler();
    passwordBlurHandler();
  };

  let formIsValid = false;
  isSignUp
    ? firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      (formIsValid = true)
    : emailIsValid && passwordIsValid && (formIsValid = true);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formIsValid) return;
    console.log("run");
    const signUpOptions: userType = {
      name: `${enteredFirstName} ${enteredLastName}`,
      email: enteredEmail,
      password: enteredPassword,
    };
    const signInOptions: userType = {
      email: enteredEmail,
      password: enteredPassword,
    };
    formBlurHandler();
    isSignUp ? signUp(signUpOptions) : signIn(signInOptions);
  };

  return (
    <Flex
      justifyContent={"center"}
      my={{ base: "24px", md: "64px" }}
      h={{
        base: "calc(100vh - 140px - 48px)",
        md: "calc(100vh - 140px - 128px)",
      }}
      bgImage={`url('${!isSignUp ? SignInImg.src : SignUpImg.src}')`}
      bgSize={"contain"}
      bgRepeat={"no-repeat"}
      bgPos={"bottom right"}
    >
      <Flex
        flexDir={"column"}
        h={{ base: "fit-content" }}
        px={"32px"}
        py={"12px"}
        bg={!isSignUp ? "#505568" : "#89b0ae"}
        transition={"all 0.07s"}
      >
        <Heading as={"h2"}>{isSignUp ? "Sign Up" : "Sign In"}</Heading>
        <FormControl
          as={"form"}
          onSubmit={submitHandler}
          display={"grid"}
          gridTemplateColumns={
            !isSignUp ? { base: "1fr" } : { base: "1fr", md: "repeat(2, 1fr)" }
          }
          columnGap={"24px"}
          pt={"12px"}
          rowGap={"14px"}
        >
          {isSignUp && (
            <>
              <Box pos={"relative"}>
                <CustomAuthInput
                  label="First Name"
                  input={{
                    id: "first_name",
                    type: "text",
                    value: enteredFirstName,
                    placeholder: "Enter first name",
                  }}
                  onChange={firstNameChangeHandler}
                  onBlur={firstNameBlurHandler}
                  hasError={firstNameHasError}
                />
                {firstNameHasError && (
                  <AuthValidationText content="Field must be fill!" />
                )}
              </Box>
              <Box pos={"relative"}>
                <CustomAuthInput
                  label="Last Name"
                  input={{
                    id: "last_name",
                    type: "text",
                    value: enteredLastName,
                    placeholder: "Enter last name",
                  }}
                  onChange={lastNameChangeHandler}
                  onBlur={lastNameBlurHandler}
                  hasError={lastNameHasError}
                />
                {lastNameHasError && (
                  <AuthValidationText content="Field must be fill!" />
                )}
              </Box>
            </>
          )}
          <Box pos={"relative"}>
            <CustomAuthInput
              label="Email"
              input={{
                id: "email",
                type: "text",
                value: enteredEmail || "",
                placeholder: "Enter email",
              }}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              hasError={emailHasError}
            />
            {emailHasError && (
              <AuthValidationText content="Please enter correct email!" />
            )}
          </Box>
          <Box pos={"relative"}>
            <CustomAuthInput
              label="Password"
              input={{
                id: "password",
                type: !isShowPassword ? "password" : "text",
                value: enteredPassword || "",
                placeholder: "Enter password",
              }}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              hasError={passwordHasError}
            />
            {passwordHasError && (
              <AuthValidationText content="Enter password! Min 6 char!" />
            )}
          </Box>
          <DefaultBtn
            type={"submit"}
            title={isSignUp ? "Sign Up" : "Sign In"}
            customStyles={{ bg: !isSignUp ? "#89b0ae" : "#505568", mt: "28px" }}
          />
        </FormControl>
        <Flex
          alignItems={"center"}
          alignSelf={isSignUp ? { base: "center", sm: "end" } : "center"}
          mt={"24px"}
          columnGap={"8px"}
        >
          <Text fontSize={{ base: "16px", sm: "18px" }} textAlign={"center"}>
            {isSignUp ? "You have an account? " : "Don't have an acount? "}
          </Text>
          <Button
            variant={"unstyled"}
            fontSize={{ base: "18px" }}
            fontWeight={"600"}
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
