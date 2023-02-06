export interface noteType {
  user_id?: string;
  folder_id: number;
  id: number;
  title: string;
  content: string;
}

export interface notesType {
  notes: noteType[];
}
