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
import { noteType } from "types/notes_types";
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
            querySnapshot?.forEach(async (folder) => {
              deleteDoc(
                doc(
                  db,
                  "users",
                  `${options?.user_id}`,
                  "folders",
                  `${folder.data().id}`
                )
              );
              const notes = await getDocs(
                collection(
                  db,
                  "users",
                  `${options?.user_id}`,
                  "folders",
                  `${folder.data().id}`,
                  "notes"
                )
              );
              notes?.forEach((note: any) => {
                deleteDoc(
                  doc(
                    db,
                    "users",
                    `${options?.user_id}`,
                    "folders",
                    `${folder.data().id}`,
                    "notes",
                    `${note.data().id}`
                  )
                );
              });
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
          const mainFolderNote = await getDocs(
            collection(
              db,
              "users",
              `${options?.user_id}`,
              "folders",
              `${options?.id}`,
              "notes"
            )
          );
          mainFolderNote?.forEach((note) => {
            deleteDoc(
              doc(
                db,
                "users",
                `${options?.user_id}`,
                "folders",
                `${options?.id}`,
                "notes",
                `${note.data().id}`
              )
            );
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Folders"],
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
    editNote: builder.mutation({
      async queryFn(options) {
        try {
          await updateDoc(
            doc(
              db,
              "users",
              `${options?.user_id}`,
              "folders",
              `${options?.folder_id}`,
              "notes",
              `${options?.notes_id}`
            ),
            options?.note
          );
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
    }),

    deleteNote: builder.mutation({
      async queryFn(options) {
        try {
          await deleteDoc(
            doc(
              db,
              "users",
              `${options?.user_id}`,
              "folders",
              `${options?.folder_id}`,
              "notes",
              `${options?.note_id}`
            )
          );

          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useAddFolderMutation,
  useEditFolderMutation,
  useDeleteFolderMutation,
  useAddNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = ideaStorageApi;
