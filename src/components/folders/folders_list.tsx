import { Flex, Image, Text, UnorderedList } from "@chakra-ui/react";
import DefaultBtn from "components/ui/defaultBtn";
import React, { useState } from "react";
import { getFolders, getIsAddRootFolder } from "store/folder/folder.selectors";
import AddFolderIconWhite from "assets/image/add-folder-white.png";
import AddFolderIconGreen from "assets/image/add-folder.png";
import SubFolder from "./sub_folder";
import AddRootFolder from "./add_root_folder";
import { useActions } from "hooks/useActions";

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
          <DefaultBtn
            onMouseEnter={() => setHoverAddBtn(true)}
            onMouseLeave={() => setHoverAddBtn(false)}
            customStyles={{ w: "fit-content", px: "12px" }}
            onClick={() => setIsShowAddRootFolder(true)}
          >
            <Flex alignItems={"center"} columnGap={"8px"}>
              <Image
                src={
                  (!hoverAddBtn ? AddFolderIconWhite : AddFolderIconGreen).src
                }
                w={"32px"}
                alt={"Add folder icon"}
              />
              <Text>Add folder to root</Text>
            </Flex>
          </DefaultBtn>
        )}
      </Flex>
    </>
  );
};

export default FoldersList;
