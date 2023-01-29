import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { InputsType } from "types/ui_types";

const CustomInput: React.FC<InputsType> = ({
  label,
  input,
  customStyles,
  onChange,
  onBlur,
}) => {
  return (
    <Flex flexDir={"column"} w={"100%"}>
      {label && <FormLabel>{label}</FormLabel>}
      <Flex
        border={"1px solid #ced4da"}
        h={"40px"}
        ps={"16px"}
        {...customStyles}
      >
        <Input
          autoComplete="off"
          variant={"unstyled"}
          _placeholder={{ color: "#ece9e955" }}
          _focus={{ boxShadow: "none" }}
          {...input}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Flex>
    </Flex>
  );
};

export default CustomInput;
