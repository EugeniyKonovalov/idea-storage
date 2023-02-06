import { createSlice } from "@reduxjs/toolkit";
import { notesType } from "types/notes_types";

const initialState: notesType = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
});
export const notesAction = notesSlice.actions;
export default notesSlice.reducer;
