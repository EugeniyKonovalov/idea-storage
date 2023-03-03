import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notesType, noteType } from "types/notes_types";

const initialState: notesType = {
  current_note: null,
  is_edit_note: false,
  edit_note: null,
  is_note: false,
  all_notes: [],
  show_note_in_mobile: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<noteType | null>) => {
      state.current_note = action.payload;
    },
    isEditNote: (state, action: PayloadAction<boolean>) => {
      state.is_edit_note = action.payload;
    },
    setEditNote: (state, action: PayloadAction<noteType | null>) => {
      state.edit_note = action.payload;
    },
    isNoteForm: (state, action: PayloadAction<boolean>) => {
      state.is_note = action.payload;
    },
    setAllNotes: (state, action: PayloadAction<noteType>) => {
      state.all_notes.push(action.payload);
    },
    setIsShowMobileNote: (state, action: PayloadAction<boolean>) => {
      state.show_note_in_mobile = action.payload;
    },
  },
});
export const notesAction = notesSlice.actions;
export default notesSlice.reducer;
