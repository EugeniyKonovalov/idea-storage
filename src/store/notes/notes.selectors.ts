import { useAppSelector } from "hooks/useRedux";

const getCurrentNote = () =>
  useAppSelector((state) => state.notes.current_note);

const getIsEditNote = () => useAppSelector((state) => state.notes.is_edit_note);

const getEditNote = () => useAppSelector((state) => state.notes.edit_note);

const getIsNote = () => useAppSelector((state) => state.notes.is_note);

const getAllNotes = () => useAppSelector((state) => state.notes.all_notes);

const getIsShowMobileNote = () =>
  useAppSelector((state) => state.notes.show_note_in_mobile);

export {
  getCurrentNote,
  getIsEditNote,
  getEditNote,
  getIsNote,
  getAllNotes,
  getIsShowMobileNote,
};
