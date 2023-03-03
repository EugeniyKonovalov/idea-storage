import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";

import AddRootFolder from "components/folders/add_root_folder";

const StartPage: React.FC = () => {
  return (
    <Grid templateColumns={"1fr"}>
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        rowGap={"24px"}
        w={"100%"}
      >
        <Text fontSize={"18px"} fontWeight={"400"} px={"24px"}>
          Create your first folder to get started
        </Text>
        <AddRootFolder />
      </Flex>
    </Grid>
  );
};

export default StartPage;
