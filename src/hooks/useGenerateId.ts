const useGenerateId = (data: any[]) => {
  const newId = Math.max(...data?.map((item) => +item.id)) + 1;

  return newId;
};
export default useGenerateId;
