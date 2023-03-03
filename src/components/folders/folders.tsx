import { Flex, Grid } from "@chakra-ui/react";
import StartPage from "components/start_page/start_page";
import React from "react";
import { getFolders } from "store/folder/folder.selectors";
import AppChildrensType from "types/app_props_type";
import FoldersList from "./folders_list";

const Folders: React.FC<AppChildrensType> = ({ children }) => {
  const folders = getFolders();

  return (
    <Flex
      flexDir={"column"}
      my={"32px"}
      pl={{ base: "0", lg: "24px" }}
      pr={{ base: "0", lg: "12px" }}
      w={"100%"}
      justifyContent={"space-between"}
      // minW={"320px"}
      h={"calc(100vh - 141px - 64px)"}
    >
      {(folders?.length === 1 || folders?.length === 0) && <StartPage />}
      {folders?.length !== 1 && <FoldersList />}
    </Flex>
  );
};

export default Folders;
