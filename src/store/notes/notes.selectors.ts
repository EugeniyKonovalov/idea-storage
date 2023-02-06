import { useAppSelector } from "hooks/useRedux";

const getNotes = () => useAppSelector((state) => state.notes.notes);

export { getNotes };
