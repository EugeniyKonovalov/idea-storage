import React, { FormEvent, useState } from "react";

const useInput = () => {
  const [dataForm, setDataFofm] = useState<string | null | any>(null);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let key = event.currentTarget.id;
    let value = event.currentTarget.value;
    setDataFofm((prev: any) => ({ ...prev, [key]: value }));
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const leaveFocusHandler = () => {
    setIsTouched(false);
  };

  return {
    data: dataForm,
    setData: setDataFofm,
    isTouched,
    changeHandler,
    blurHandler,
    leaveFocusHandler,
  };
};
export default useInput;
