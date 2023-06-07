import React from "react";
import { useSelector } from "react-redux";
import LwLayout from "../common/LwLayout";

const EditLeetCodes = () => {
  const selectedLeetcodeId = useSelector((state) => state.selectedLeetcodeId);
  const pageContent = <>This is EditLeetCodes Page</>;
  console.log({ selectedLeetcodeId });
  return <LwLayout content={pageContent} />;
};

export default EditLeetCodes;
