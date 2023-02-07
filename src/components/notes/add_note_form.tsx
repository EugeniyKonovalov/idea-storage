import { Flex, Text } from "@chakra-ui/react";
import CustomInput from "components/ui/customInput";
import CustomModal from "components/ui/customModal";
import CustomTextarea from "components/ui/customTextarea";
import DefaultBtn from "components/ui/defaultBtn";
import useGenerateId from "hooks/useGenerateId";
import useGetNotes from "hooks/useGetNotes";
import useInput from "hooks/useInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAddNoteMutation } from "store/api_queries/api_idea_storage";
import { noteType } from "types/notes_types";
import { addModalType, ModalType } from "types/ui_types";
import { auth } from "../../../firebase.config";
import { inter_400_18_25 } from "../../../styles/fontStyles";

const AddNoteForm: React.FC<ModalType & addModalType> = ({
  isOpen,
  onClose,
  item,
  showSubfolderHandler,
}) => {
  const [user] = useAuthState(auth);
  const [addNote] = useAddNoteMutation();
  const notes = useGetNotes(item?.id);

  const {
    data: note,
    setData: setNote,
    changeHandler: noteChangeHandler,
    blurHandler: noteBlurHandler,
    isTouched: noteIsTouched,
    leaveFocusHandler: noteLeaveFocusHandler,
  } = useInput();

  const noteId = useGenerateId(notes);

  const addNoteHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const options: noteType = {
      user_id: user?.uid,
      folder_id: item?.id,
      id: notes?.length === 0 ? 1 : noteId,
      title: note?.title,
      content: note?.content,
    };
    showSubfolderHandler();
    addNote(options);
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Text {...inter_400_18_25} color={"#89b0ae"} mt={"12px"} ml={"24px"}>
        Add subfolder
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
          <CustomInput
            input={{
              id: "title",
              type: "text",
              value: note?.title || "",
              placeholder: "Enter note title",
            }}
            maxLength={20}
            customStyles={{ h: "40px" }}
            onChange={noteChangeHandler}
            onBlur={noteBlurHandler}
          />
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
          title="Add"
          customStyles={{ w: "35%", alignSelf: "flex-end" }}
          onClick={addNoteHandler}
        />
      </Flex>
    </CustomModal>
  );
};

export default AddNoteForm;
