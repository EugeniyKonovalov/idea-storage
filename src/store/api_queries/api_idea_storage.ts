import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { folderType } from "types/folders_types";
import { db } from "../../../firebase.config";

export const ideaStorageApi = createApi({
  reducerPath: "ideaStorage",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Folders"],
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

export const { useGetFoldersQuery, useAddFolderMutation, useAddNoteMutation } =
  ideaStorageApi;
