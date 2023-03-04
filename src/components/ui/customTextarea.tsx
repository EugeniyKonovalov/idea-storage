import { Flex, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";
import { InputsType } from "types/ui_types";

const CustomTextarea: React.FC<InputsType> = ({
  label,
  input,
  customStyles,
  onChange,
  onBlur,
}) => {
  return (
    <Flex flexDir={"column"} w={"100%"}>
      {label && <FormLabel>{label}</FormLabel>}
      <Flex>
        <Textarea
          borderRadius={"5px"}
          border={"1px solid #ced4da"}
          minH={"150px"}
          maxH={"240px"}
          px={"16px"}
          autoComplete="off"
          variant={"unstyled"}
          rows={14}
          _placeholder={{ color: "#ece9e955" }}
          _focus={{ boxShadow: "none" }}
          {...customStyles}
          {...input}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Flex>
    </Flex>
  );
};

export default CustomTextarea;
