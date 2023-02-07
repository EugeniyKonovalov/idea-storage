import { chakra, Flex, Image, Text, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";
import { getFolders, getIsAddRootFolder } from "store/folder/folder.selectors";
import AddFolderIconWhite from "assets/image/add-folder-white.png";
import SubFolder from "./sub_folder";
import AddRootFolder from "./add_root_folder";
import { useActions } from "hooks/useActions";
import { inter_400_12_16 } from "../../../styles/fontStyles";

const Span = chakra("span", {});

const FoldersList = () => {
  const [hoverAddBtn, setHoverAddBtn] = useState<boolean>(false);
  const { setIsShowAddRootFolder } = useActions();
  const isShowAddRootFolder = getIsAddRootFolder();
  const folders = getFolders();

  const childrenFolder = (id: number | string) => {
    let childItems = folders?.filter((item) => item.parent_id === id);
    childItems?.sort((a, b) => (a.id > b.id ? 1 : -1));

    return childItems?.map((item) => (
      <SubFolder key={item.id} item={item}>
        <UnorderedList listStyleType={"none"} ml={"12px"}>
          {childrenFolder(item.id)}
        </UnorderedList>
      </SubFolder>
    ));
  };

  const directories = folders?.map(
    (item) =>
      typeof item.parent_id === "undefined" && (
        <UnorderedList w={"100%"} ml={"0"} listStyleType={"none"} key={item.id}>
          {childrenFolder(item.id)}
        </UnorderedList>
      )
  );

  return (
    <>
      <Flex mb={"64px"}>{folders?.length > 0 && directories}</Flex>
      <Flex flexDir={"column"}>
        {isShowAddRootFolder && <AddRootFolder />}
        {!isShowAddRootFolder && (
          <Flex alignItems={"end"} columnGap={"6px"}>
            <Image
              onMouseEnter={() => setHoverAddBtn(true)}
              onMouseLeave={() => setHoverAddBtn(false)}
              src={AddFolderIconWhite.src}
              w={"54px"}
              alt={"Add folder icon"}
              cursor={"pointer"}
              onClick={() => setIsShowAddRootFolder(true)}
            />
            {hoverAddBtn && (
              <Text {...inter_400_12_16} mb={"6px"}>
                <Span color={"#FFBE55"}>*</Span>Add folder to root
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default FoldersList;
