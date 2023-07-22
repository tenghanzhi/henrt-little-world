import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Skeleton } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import ComponentsForm from "./ComponentsForm";
import LwLayout from "../common/LwLayout";
import handleMessage from "../utils/handleMessage";
import style from "./style/EditComponent.module.css";

const EditComponents = () => {
  const selectedComponentId = useSelector((state) => state.selectedComponentId);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [fetchedComponentData, setFetchedComponentData] = useState({});

  useEffect(() => {
    handleGetComponentDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetComponentDataById = () => {
    const messageKey = "editPageLoadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.COMPONENTS_GET_BY_ID}/${selectedComponentId}`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
        }
        setFetchedComponentData(response.data.attributes);
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.LOADING_MESSAGE_ERROR}${error}`
        );
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  };

  const loadedPageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_component_edit_component_header}
      >
        Edit Component {fetchedComponentData.title}
      </Typography.Title>
      <ComponentsForm isEdit={true} data={fetchedComponentData} />
    </>
  );

  const loadingPageContent = <Skeleton />;

  const pageContent = isPageLoading ? loadingPageContent : loadedPageContent;

  return <LwLayout content={pageContent} />;
};

export default EditComponents;
