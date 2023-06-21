import React from "react";
import { Typography } from "antd";
import ComponentsForm from "./ComponentsForm";
import LwLayout from "../common/LwLayout";
import style from "./style/CreateComponents.module.css";

const CreateComponents = () => {
  const pageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_component_create_component_header}
      >
        Create New Component
      </Typography.Title>
      <ComponentsForm />
    </>
  );
  return <LwLayout content={pageContent} />;
};

export default CreateComponents;
