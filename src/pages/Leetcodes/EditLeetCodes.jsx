import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Skeleton, message } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import LeetCodesForm from "./LeetCodesForm";
import LwLayout from "../common/LwLayout";
import style from "./style/EditLeetCodes.module.css";

const EditLeetCodes = () => {
  const selectedLeetcodeId = useSelector((state) => state.selectedLeetcodeId);
  const [isEditPageLoading, setIsEditPageLoading] = useState(true);
  const [fetchedLeetcodeData, setFetchedLeetcodeData] = useState({});

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
        `${apiMatrix.LEET_CODES_GET_BY_ID}/${selectedLeetcodeId}`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
        }
        setFetchedLeetcodeData(response.data.attributes);
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
        className={style.lw_leetcode_edit_leetcode_header}
      >
        Edit LeetCode Problem {fetchedLeetcodeData.leetcodeIndex}.{" "}
        {fetchedLeetcodeData.title}
      </Typography.Title>
      <LeetCodesForm isEdit={true} data={fetchedLeetcodeData} />
    </>
  );

  const loadingPageContent = <Skeleton />;

  const pageContent = isEditPageLoading
    ? loadingPageContent
    : loadedPageContent;

  return <LwLayout content={pageContent} />;
};

export default EditLeetCodes;
