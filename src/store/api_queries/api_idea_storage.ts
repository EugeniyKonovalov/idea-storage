import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { folderType } from "types/folders_types";
import { db } from "../../../firebase.config";

export const ideaStorageApi = createApi({
  reducerPath: "ideaStorage",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Folders", "Notes"],
  endpoints: (builder) => ({
    getFolders: builder.query<folderType[], string | undefined>({
      async queryFn(userId) {
        try {
          const ref = collection(db, "users", `${userId}`, "folders");
          const querySnapshot = await getDocs(ref);
          let folders: folderType[] = [];
          querySnapshot?.forEach((doc) => {
            folders.push(doc.data() as folderType);
          });
          return { data: folders };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Folders"],
    }),

    addFolder: builder.mutation({
      async queryFn(options) {
        try {
          await setDoc(
            doc(
              db,
              "users",
              `${options?.user_id}`,
              "folders",
              `${options?.id}`
            ),
            options
          );
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Folders"],
    }),
    editFolder: builder.mutation({
      async queryFn(options) {
        try {
          await updateDoc(
            doc(
              db,
              "users",
              `${options?.user_id}`,
              "folders",
              `${options?.id}`
            ),
            options?.folder
          );
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Folders"],
    }),
    deleteFolder: builder.mutation({
      async queryFn(options) {
        try {
          const subfolderDelete = async (options: {
            user_id: number;
            id: number;
          }) => {
            const ref = query(
              collection(db, "users", `${options?.user_id}`, "folders"),
              where("parent_id", "==", options?.id)
            );
            const querySnapshot = await getDocs(ref);
            querySnapshot?.forEach((folder) => {
              deleteDoc(
                doc(
                  db,
                  "users",
                  `${options?.user_id}`,
                  "folders",
                  `${folder.data().id}`
                )
              );
              subfolderDelete({
                user_id: options?.user_id,
                id: folder.data().id,
              });
            });
          };
          subfolderDelete(options);
          await deleteDoc(
            doc(db, "users", `${options?.user_id}`, "folders", `${options.id}`)
          );
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      // invalidatesTags: ["Folders"],
    }),
    addNote: builder.mutation({
      async queryFn(options) {
        try {
          await setDoc(
            doc(
              db,
              "users",
              `${options?.user_id}`,
              "folders",
              `${options?.folder_id}`,
              "notes",
              `${options?.id}`
            ),
            options
          );
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),
  }),
});

export const {
  useAddFolderMutation,
  useEditFolderMutation,
  useDeleteFolderMutation,
  useAddNoteMutation,
} = ideaStorageApi;
