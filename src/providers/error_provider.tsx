import { useToast } from "@chakra-ui/react";
import { useActions } from "hooks/useActions";
import React, { useEffect } from "react";
import { getErrors } from "store/errors/errors.selectors";
import AppChildrensType from "types/app_props_type";

const ErrorProvider: React.FC<AppChildrensType> = ({ children }) => {
  const errors = getErrors();
  const toast = useToast();
  const { clearError } = useActions();

  useEffect(() => {
    if (errors) {
      errors?.forEach((error: any) =>
        toast({
          position: "top-right",
          title: error.includes("sucessfully")
            ? error
            : "Something went wrong!",
          description: !error.includes("sucessfully") && error,
          status: error.includes("sucessfully") ? "success" : "warning",
          duration: 2500,
          isClosable: true,
        })
      );
    }
    clearError();
  }, [errors]);

  return <>{children}</>;
};
export default ErrorProvider;
