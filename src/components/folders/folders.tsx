import { Flex, Grid } from "@chakra-ui/react";
import StartPage from "components/start_page/start_page";
import React from "react";
import { getFolders } from "store/folder/folder.selectors";
import FoldersList from "./folders_list";

const Folders: React.FC = () => {
  const folders = getFolders();

  return (
    <>
      <Flex
        flexDir={"column"}
        my={"32px"}
        pl={"24px"}
        pr={"12px"}
        w={"100%"}
        justifyContent={"space-between"}
        minW={"320px"}
        h={"calc(100vh - 141px - 64px)"}
        borderRight={"1px solid #fff"}
      >
        {folders?.length === 1 && <StartPage />}
        {folders?.length !== 1 && <FoldersList />}
      </Flex>
    </>
  );
};

export default Folders;
