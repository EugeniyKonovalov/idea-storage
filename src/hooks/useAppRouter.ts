import { NextRouter, useRouter } from "next/router";

const useAppRouter = () => {
  const router: NextRouter = useRouter();
  return { router };
};

export default useAppRouter;
