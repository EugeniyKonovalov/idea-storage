import { chakra, Flex, Text } from "@chakra-ui/react";
import CustomInput from "components/ui/customInput";
import CustomModal from "components/ui/customModal";
import CustomTextarea from "components/ui/customTextarea";
import DefaultBtn from "components/ui/defaultBtn";
import ValidationText from "components/ui/validation_text";
import { useActions } from "hooks/useActions";
import useGenerateId from "hooks/useGenerateId";
import useGetNotes from "hooks/useGetNotes";
import useInput from "hooks/useInput";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useAddNoteMutation,
  useEditNoteMutation,
} from "store/api_queries/api_idea_storage";
import { getIsExistName } from "store/folder/folder.selectors";
import {
  getAllNotes,
  getEditNote,
  getIsEditNote,
} from "store/notes/notes.selectors";
import { noteType } from "types/notes_types";
import { addModalType, ModalType } from "types/ui_types";
import { auth } from "../../../firebase.config";

const Span = chakra("span", {});

const AddNoteForm: React.FC<ModalType & addModalType> = ({
  isOpen,
  onClose,
  item,
  showSubfolderHandler,
}) => {
  const { isEditNote, isExistName, setEditNote, setCurrentNote, isNoteForm } =
    useActions();
  const [user] = useAuthState(auth);
  const [addNote] = useAddNoteMutation();
  const [editNote] = useEditNoteMutation();
  const isExist = getIsExistName();
  const notes = useGetNotes(item?.id);
  const isEdit = getIsEditNote();
  const currentEditNote = getEditNote();

  const allNotes = getAllNotes();

  const {
    data: note,
    setData: setNote,
    changeHandler: noteChangeHandler,
    blurHandler: noteBlurHandler,
    isTouched: noteIsTouched,
  } = useInput();

  const noteId = useGenerateId(notes);

  const addNoteHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit && allNotes?.map((item) => item.title)?.includes(note?.title)) {
      isExistName(true);
      return;
    }

    const options: noteType = {
      user_id: user?.uid,
      folder_id: item?.id,
      id: !isEdit ? (notes?.length === 0 ? 1 : noteId) : note?.id,
      title: note?.title,
      content: note?.content ? note?.content : "",
    };
    showSubfolderHandler();
    !isEdit && note?.title && addNote(options);
    isEdit && note?.title && editNote(options);
    isEdit && note?.title && setCurrentNote(options);
    note?.title && onCloseHandler();
  };

  const onCloseHandler = () => {
    onClose();
    isEditNote(false);
    isNoteForm(false);
    setNote(null);
    setEditNote(null);
  };

  useEffect(() => {
    isEdit && setNote(currentEditNote);
    !isEdit && setNote(null);
  }, [isEdit]);

  useEffect(() => {
    isExistName(
      allNotes?.map((item) => item.title)?.includes(note?.title) ? true : false
    );
  }, [note?.title]);

  return (
    <CustomModal isOpen={isOpen} onClose={onCloseHandler}>
      <Text
        fontSize={"18px"}
        fontWeight={"400"}
        color={"#89b0ae"}
        mt={"12px"}
        ml={"24px"}
      >
        {!isEdit && " Add note"}
        {isEdit && (
          <>
            Edit note{" "}
            <Span fontWeight={"700"} color={"#FFBE55"}>
              {currentEditNote?.title}
            </Span>
          </>
        )}
      </Text>
      <Flex
        flexDir={"column"}
        px={"24px"}
        pt={"24px"}
        pb={"24px"}
        rowGap={"32px"}
      >
        <Flex
          as={"form"}
          flexDir={"column"}
          rowGap={"24px"}
          onSubmit={addNoteHandler}
          alignItems={"center"}
          w={"100%"}
          pos={"relative"}
        >
          <Flex w={"100%"} pos={"relative"}>
            <CustomInput
              input={{
                id: "title",
                type: "text",
                value: note?.title || "",
                placeholder: "Enter note title",
              }}
              maxLength={10}
              customStyles={{ h: "40px" }}
              onChange={noteChangeHandler}
              onBlur={noteBlurHandler}
            />
            <ValidationText
              isExistName={isExist}
              topPosition={"42px"}
              enteredName={note?.title}
              isTouched={noteIsTouched}
              leftPosition={"0"}
            />
          </Flex>
          <CustomTextarea
            input={{
              id: "content",
              type: "text",
              value: note?.content || "",
              placeholder: "Enter note",
            }}
            customStyles={{ h: "40px" }}
            onChange={noteChangeHandler}
            onBlur={noteBlurHandler}
          />
        </Flex>
        <DefaultBtn
          title={!isEdit ? "Add" : "Edit"}
          customStyles={{ w: "35%", alignSelf: "flex-end" }}
          onClick={addNoteHandler}
        />
      </Flex>
    </CustomModal>
  );
};

export default AddNoteForm;
