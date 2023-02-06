import { collection, doc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { noteType } from "types/notes_types";
import { auth, db } from "../../firebase.config";

const useGetNotes = (folder_id: number) => {
  const [user] = useAuthState(auth);
  const [snapshot] = useCollection(
    query(
      collection(
        db,
        "users",
        `${user?.uid}`,
        "folders",
        `${folder_id}`,
        "notes"
      ),
      where("folder_id", "==", folder_id)
    )
  );
  const notes = snapshot?.docs?.map((doc) => doc.data());

  return notes as noteType[];
};
export default useGetNotes;
