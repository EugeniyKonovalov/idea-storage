import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      h={"70px"}
      marginTop={"auto"}
      zIndex={100}
    >
      <Text textAlign={"center"} fontSize={"18px"}>
        &copy; Idea Store {currentYear}
      </Text>
    </Flex>
  );
};

export default Footer;
