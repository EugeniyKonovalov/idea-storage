import { chakra, Text } from "@chakra-ui/react";
import React from "react";
import { validationTextType } from "types/ui_types";
import {
  inter_300_14_18,
  inter_400_10_14,
  inter_400_12_16,
} from "../../../styles/fontStyles";

const Span = chakra("span", {});

const FolderValidationText: React.FC<validationTextType> = ({
  isExistName,
  folderName,
  isTouched,
  topPosition,
}) => {
  return (
    <>
      {!folderName && isTouched && (
        <Text
          pos={"absolute"}
          top={topPosition}
          {...inter_300_14_18}
          color={"#f59700"}
        >
          Please enter folder name!
        </Text>
      )}
      {isExistName && (
        <Text
          pos={"absolute"}
          top={topPosition}
          {...inter_300_14_18}
          color={"#f59700"}
        >
          {folderName === "root"
            ? "You can`t use this name!"
            : "This name already exists!"}
        </Text>
      )}
      {!isExistName && folderName && (
        <Text
          pos={"absolute"}
          top={topPosition}
          {...inter_300_14_18}
          color={"#56b3a2"}
        >
          <Span fontWeight={"600"}>{folderName}</Span> is available
        </Text>
      )}
      {folderName && (
        <Text
          pos={"absolute"}
          top={"45px"}
          {...inter_400_10_14}
          color={"#c6e6e0"}
        >
          <Span color={"#ffd6ba"}>*</Span>maximum 20 characters!
        </Text>
      )}
    </>
  );
};

export default FolderValidationText;
