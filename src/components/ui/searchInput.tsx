import * as React from "react";

import { FormControl, Input } from "@chakra-ui/react";
import { InputsType } from "types/ui_types";

const SearchInput: React.FC<InputsType> = ({ input, onChange }) => {
  return (
    <FormControl
      as={"form"}
      display={"flex"}
      border={"1px solid #ced4da"}
      h={"40px"}
      ps={"16px"}
    >
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
