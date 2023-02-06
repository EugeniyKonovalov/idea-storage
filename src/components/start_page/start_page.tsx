import { chakra, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { inter_400_18_25 } from "../../../styles/fontStyles";
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
        <Text {...inter_400_18_25} px={"24px"}>
          Create your first folder to get started
        </Text>
        <AddRootFolder />
      </Flex>
    </Grid>
  );
};

export default StartPage;
