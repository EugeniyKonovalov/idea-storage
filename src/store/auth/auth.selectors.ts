import { useAppSelector } from "hooks/useRedux";

const getIsLoggedIn = () => useAppSelector((state) => state.auth.isLoggedIn);

const getIsShowPassword = () =>
  useAppSelector((state) => state.auth.is_show_password);

export { getIsLoggedIn, getIsShowPassword };
