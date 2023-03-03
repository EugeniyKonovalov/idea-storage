import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
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
import { loadingErrors } from "store/errors/errors.actions";
import { notesAction } from "store/notes/notes.slice";
import { folderType } from "types/folders_types";
import { noteType } from "types/notes_types";
import { db } from "../../../firebase.config";

export const ideaStorageApi = createApi({
  reducerPath: "ideaStorage",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Folders", "Notes"],
  endpoints: (builder) => ({
    addFolder: builder.mutation({
      async queryFn(options, { dispatch }) {
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
          dispatch(loadingErrors({ message: "Folder add sucessfully!" }));
          return { data: null };
        } catch (error: any) {
          dispatch(loadingErrors(error));
          return { error: error.message };
        }
      },
      invalidatesTags: ["Folders"],
    }),
    editFolder: builder.mutation({
      async queryFn(options, { dispatch }) {
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
          dispatch(loadingErrors({ message: "Folder update sucessfully!" }));
          return { data: null };
        } catch (error: any) {
          dispatch(loadingErrors(error));
          return { error: error.message };
        }
      },
      invalidatesTags: ["Folders"],
    }),
    deleteFolder: builder.mutation({
      async queryFn(options, { dispatch }) {
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
              notes?.forEach((note) => {
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
          dispatch(loadingErrors({ message: "Folder delete sucessfully!" }));
          return { data: null };
        } catch (error: any) {
          dispatch(loadingErrors(error));
          return { error: error.message };
        }
      },
      invalidatesTags: ["Folders", "Notes"],
    }),

    getAllNotes: builder.query({
      async queryFn(user_id, { dispatch }) {
        try {
          const folders = await getDocs(
            collection(db, "users", `${user_id}`, "folders")
          );
          folders?.forEach(async (doc) => {
            const notes = await getDocs(
              collection(
                db,
                "users",
                `${user_id}`,
                "folders",
                `${doc.data().id}`,
                "notes"
              )
            );
            notes?.forEach((note) => {
              dispatch(notesAction.setAllNotes(note.data() as noteType));
            });
          });
          return { data: null };
        } catch (error: any) {
          dispatch(loadingErrors(error));
          return { error: error.message };
        }
      },
      providesTags: ["Notes"],
    }),

    addNote: builder.mutation({
      async queryFn(options, { dispatch }) {
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
          dispatch(loadingErrors({ message: "Note add sucessfully!" }));
          return { data: null };
        } catch (error: any) {
          dispatch(loadingErrors(error));
          return { error: error.message };
        }
      },
      invalidatesTags: ["Notes"],
    }),
    editNote: builder.mutation({
      async queryFn(options, { dispatch }) {
        try {
          await updateDoc(
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
          dispatch(loadingErrors({ message: "Note update sucessfully!" }));

          return { data: null };
        } catch (error: any) {
          dispatch(loadingErrors(error));
          return { error: error.message };
        }
      },
      invalidatesTags: ["Notes"],
    }),

    deleteNote: builder.mutation({
      async queryFn(options, { dispatch }) {
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
          dispatch(loadingErrors({ message: "Note delete sucessfully!" }));

          return { data: null };
        } catch (error: any) {
          dispatch(loadingErrors(error));
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
  useGetAllNotesQuery,
  useAddNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = ideaStorageApi;
