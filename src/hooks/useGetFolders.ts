import { folderType } from "types/folders_types";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const useGetFolders = () => {
  const [user] = useAuthState(auth);
  const [snapshot] = useCollection(
    query(collection(db, "users", `${user?.uid}`, "folders"))
  );
  const folders = snapshot?.docs?.map((doc) => doc.data());

  return folders as folderType[];
};

export default useGetFolders;
