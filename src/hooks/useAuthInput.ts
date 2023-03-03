import React, { FormEvent, useState } from "react";

const useAuthInput = (validate?: (value: string) => void) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const isValid = validate && validate(enteredValue);
  const hasError = !isValid && isTouched;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const resetHandler = () => {
    setIsTouched(false);
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    resetHandler,
  };
};
export default useAuthInput;
