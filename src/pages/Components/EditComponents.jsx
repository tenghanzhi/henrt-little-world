import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Skeleton, message } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import ComponentsForm from "./ComponentsForm";
import LwLayout from "../common/LwLayout";
import style from "./style/EditComponent.module.css";

const EditComponents = () => {
  const selectedComponentId = useSelector((state) => state.selectedComponentId);
  const [isEditPageLoading, setIsEditPageLoading] = useState(true);
  const [fetchedComponentData, setFetchedComponentData] = useState({});

  useEffect(() => {
    handleGetComponentDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessage = (key, type, content) => {
    const messageDuration = 2;

    switch (type) {
      case "loading": {
        message.loading({
          key: key,
          content: content,
        });
        break;
      }
      case "success": {
        message.success({
          key: key,
          content: content,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        message.error({
          key: key,
          content: content,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handleGetComponentDataById = () => {
    const messageKey = "editPageLoadingMessage";

    handleMessage(messageKey, "loading", messageMatrix.LOADING_MESSAGE_LOADING);

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
        setIsEditPageLoading(false);
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

  const pageContent = isEditPageLoading
    ? loadingPageContent
    : loadedPageContent;

  return <LwLayout content={pageContent} />;
};

export default EditComponents;
