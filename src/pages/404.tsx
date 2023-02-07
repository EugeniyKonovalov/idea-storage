import { Flex, Image } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import NotPageImg from "assets/image/404.png";
import DefaultBtn from "components/ui/defaultBtn";
import useAppRouter from "hooks/useAppRouter";

const Index: NextPage = () => {
  const { router } = useAppRouter();

  const backHandler = () => router.back();

  return (
    <Flex
      alignItems={"center"}
      h={"100vh"}
      justifyContent={"center"}
      flexDir={"column"}
    >
      <Image src={NotPageImg.src} w={"50%"} alt={"404 image"} />

      <DefaultBtn
        title="Back"
        customStyles={{ w: "156px", h: "50px" }}
        onClick={backHandler}
      />
    </Flex>
  );
};

export default Index;
