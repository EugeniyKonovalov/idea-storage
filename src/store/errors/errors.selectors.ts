import { useAppSelector } from "hooks/useRedux";

const getErrors = () => useAppSelector((state) => state.error.errorData);

export { getErrors };
