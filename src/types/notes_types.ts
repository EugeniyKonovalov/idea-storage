export interface noteType {
  user_id?: string;
  folder_id: number;
  id: number;
  title: string;
  content: string;
}

export interface notesType {
  current_note: noteType | null;
  is_edit_note: boolean;
  edit_note: noteType | null;
  is_note: boolean;
  all_notes: noteType[];
  show_note_in_mobile: boolean;
}

export interface folderNotesIconsType {
  item: noteType;
  openEditNoteHandler: (event: React.MouseEvent, item: noteType) => void;
  deleteNoteHandler: (event: React.MouseEvent, item: noteType) => void;
}
