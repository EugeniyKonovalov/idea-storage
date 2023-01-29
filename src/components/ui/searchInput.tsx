import * as React from "react";

import { Flex, FormControl, Image, Input } from "@chakra-ui/react";
import { InputsType } from "types/ui_types";
import SearchIcon from "assets/image/search-icon.png";
const SearchInput: React.FC<InputsType> = ({ input, onChange }) => {
  return (
    <FormControl
      as={"form"}
      display={"flex"}
      border={"1px solid #ced4da"}
      h={"40px"}
      ps={"8px"}
      columnGap={"8px"}
    >
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Image src={SearchIcon.src} w={"32px"} alt="Search icon" />
      </Flex>
      <Input
        autoComplete="off"
        variant={"unstyled"}
        _placeholder={{ color: "#ced4da" }}
        _focus={{ boxShadow: "none" }}
        {...input}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default SearchInput;
