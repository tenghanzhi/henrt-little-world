import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Skeleton, message } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import ApplicationsForm from "./ApplicationsForm";
import LwLayout from "../common/LwLayout";
import style from "./style/EditApplication.module.css";

const EditApplication = () => {
  const selectedApplicationId = useSelector(
    (state) => state.selectedApplicationId
  );
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [fetchedApplicationData, setFetchedApplicationData] = useState({});

  useEffect(() => {
    handleGetLeetcodeDataById();
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

  const handleGetLeetcodeDataById = () => {
    const messageKey = "editPageLoadingMessage";

    handleMessage(messageKey, "loading", messageMatrix.LOADING_MESSAGE_LOADING);

    (async () => {
      const response = await fetch(
        `${apiMatrix.APPLICATIONS_GET_BY_ID}/${selectedApplicationId}`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
        }
        setFetchedApplicationData(response.data.attributes);
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
        className={style.lw_application_edit_leetcode_header}
      >
        Edit Application {fetchedApplicationData.name}
      </Typography.Title>
      <ApplicationsForm isEdit={true} data={fetchedApplicationData} />
    </>
  );

  const loadingPageContent = <Skeleton />;

  const pageContent = isPageLoading
    ? loadingPageContent
    : loadedPageContent;

  return <LwLayout content={pageContent} />;
};

export default EditApplication;