import { User } from "firebase/auth";

export interface userType {
  name?: string;
  email: string;
  password: string;
}

export interface authType {
  user: User | null;
  token?: string | undefined;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  is_show_password?: boolean;
}
