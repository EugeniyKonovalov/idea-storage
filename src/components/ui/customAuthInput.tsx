import { Box, Flex, FormLabel, Grid, Input } from "@chakra-ui/react";
import * as React from "react";
import { InputsType } from "types/ui_types";

const CustomAuthInput: React.FC<InputsType> = ({ label, input, onChange }) => {
  return (
    <Flex flexDir={"column"}>
      <FormLabel>{label}</FormLabel>
      <Flex as={"form"} border={"1px solid #ced4da"} h={"40px"} ps={"16px"}>
        <Input
          autoComplete="off"
          variant={"unstyled"}
          _placeholder={{ color: "#ced4da" }}
          _focus={{ boxShadow: "none" }}
          {...input}
          onChange={onChange}
        />
      </Flex>
    </Flex>
  );
};

export default CustomAuthInput;
