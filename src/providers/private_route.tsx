import AppChildrensType from "types/app_props_type";
import { useState, useEffect } from "react";
import { getIsLoggedIn } from "store/auth/auth.selectors";
import useAppRouter from "hooks/useAppRouter";
import { allowRoute } from "../utils/allowRoute";

const ProivateRoute: React.FC<AppChildrensType> = ({ children }) => {
  const { router } = useAppRouter();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const isLoggedIn = getIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      if (!allowRoute.includes(router.pathname)) {
        router.push("/sign_in");
        return;
      }
    } else {
      if (allowRoute.includes(router.pathname)) {
        router.push("/folders");
        return;
      }
    }
    setIsAllowed(true);
  }, [router.asPath, isLoggedIn]);

  return isAllowed ? <>{children}</> : null;
};

export default ProivateRoute;
