import { chakra, Text } from "@chakra-ui/react";
import React from "react";
import { getIsExistName } from "store/folder/folder.selectors";
import {
  getEditNote,
  getIsEditNote,
  getIsNote,
} from "store/notes/notes.selectors";
import { validationTextType } from "types/ui_types";

const Span = chakra("span", {});

const ValidationText: React.FC<validationTextType> = ({
  enteredName,
  isTouched,
  topPosition,
  starTopPosition,
  leftPosition,
}) => {
  const isExist = getIsExistName();
  const isNote = getIsNote();
  const isEditNote = getIsEditNote();
  const currentEditNote = getEditNote();

  return (
    <>
      {!enteredName && isTouched && (
        <Text
          pos={"absolute"}
          left={leftPosition}
          top={topPosition}
          fontSize={"14px"}
          fontWeight={"300"}
          color={"#f59700"}
        >
          {!isNote ? "Please enter folder name!" : "Please enter note title"}
        </Text>
      )}

      {isExist && (
        <Text
          pos={"absolute"}
          left={leftPosition}
          top={topPosition}
          fontSize={"14px"}
          fontWeight={"300"}
          color={"#f59700"}
        >
          {!isNote && (
            <>
              {enteredName === "root"
                ? "You can`t use this name!"
                : "This name already exists!"}
            </>
          )}
          {isNote && enteredName !== currentEditNote?.title && (
            <>This title already exists!</>
          )}
        </Text>
      )}

      <>
        {!isExist && enteredName && (
          <Text
            pos={"absolute"}
            left={leftPosition}
            top={topPosition}
            fontSize={"14px"}
            fontWeight={"300"}
            color={"#56b3a2"}
          >
            {!isEditNote && (
              <>
                <Span fontWeight={"600"}>{enteredName}</Span> is available
              </>
            )}
            {isEditNote && enteredName !== currentEditNote?.title && (
              <>
                <Span fontWeight={"600"}>{enteredName}</Span> is available
              </>
            )}
          </Text>
        )}
      </>

      {!isNote && (
        <>
          {enteredName && enteredName !== "root" && (
            <Text
              pos={"absolute"}
              left={leftPosition}
              top={starTopPosition}
              fontSize={"10px"}
              fontWeight={"400"}
              color={"#c6e6e0"}
            >
              <Span color={"#ffd6ba"}>*</Span>max 10 characters!
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default ValidationText;
