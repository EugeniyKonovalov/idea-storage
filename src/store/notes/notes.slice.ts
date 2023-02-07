import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notesType, noteType } from "types/notes_types";

const initialState: notesType = {
  current_note: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<noteType | null>) => {
      state.current_note = action.payload;
    },
  },
});
export const notesAction = notesSlice.actions;
export default notesSlice.reducer;
