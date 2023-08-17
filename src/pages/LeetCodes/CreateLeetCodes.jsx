import React from "react";
import { Typography } from "antd";
import LeetCodesForm from "./LeetCodesForm";
import LwLayout from "../common/LwLayout";
import style from "./style/CreateLeetCodes.module.css";

const CreateLeetCodes = () => {
  const pageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_leetcode_create_leetcode_header}
      >
        Create New LeetCode Problem
      </Typography.Title>
      <LeetCodesForm />
    </>
  );
  return <LwLayout content={pageContent} />;
};

export default CreateLeetCodes;
