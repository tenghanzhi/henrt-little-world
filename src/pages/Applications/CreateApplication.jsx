import React from "react";
import { Typography } from "antd";
import ApplicationsForm from "./ApplicationsForm";
import LwLayout from "../common/LwLayout";
import style from "./style/CreateApplication.module.css";

const CreateApplication = () => {
  const pageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_application_create_leetcode_header}
      >
        Create New Application
      </Typography.Title>
      <ApplicationsForm />
    </>
  );
  return <LwLayout content={pageContent} />;
};

export default CreateApplication;
