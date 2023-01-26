import { useAppSelector } from "hooks/useRedux";
const getIsSignUp = () => useAppSelector((state) => state.auth.is_sign_up);

export { getIsSignUp };
