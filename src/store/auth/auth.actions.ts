import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { userType } from "types/auth_types";
import { auth, db } from "../../../firebase.config";

const signUp = createAsyncThunk(
  "auth/signUp",
  async (options: userType, thunkApi) => {
    try {
      const { email, password, name } = options;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", `${auth.currentUser?.uid}`), {
        name,
        email,
        uid: auth.currentUser?.uid,
        accessToken: auth.currentUser?.refreshToken,
      });
      await setDoc(
        doc(db, "users", `${auth.currentUser?.uid}`, "folders", "1"),
        {
          id: 1,
          name: "root",
        }
      );
      return user as User;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

const signIn = createAsyncThunk(
  "auth/signIn",
  async (options: userType, thunkApi) => {
    try {
      const { email, password } = options;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user as User;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

const authExtraActions = { signUp, signIn };

export default authExtraActions;
