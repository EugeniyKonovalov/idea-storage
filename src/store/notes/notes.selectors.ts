import { useAppSelector } from "hooks/useRedux";

const getCurrentNote = () =>
  useAppSelector((state) => state.notes.current_note);

export { getCurrentNote };
