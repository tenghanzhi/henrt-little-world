import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Skeleton } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import LeetCodesForm from "./LeetCodesForm";
import LwLayout from "../common/LwLayout";
import handleMessage from "../utils/handleMessage";
import style from "./style/EditLeetCodes.module.css";

const EditLeetCodes = () => {
  const selectedLeetcodeId = useSelector((state) => state.selectedLeetcodeId);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [fetchedLeetcodeData, setFetchedLeetcodeData] = useState({});

  useEffect(() => {
    handleGetLeetcodeDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetLeetcodeDataById = () => {
    const messageKey = "editPageLoadingMessage";

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
        setIsPageLoading(false);
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

  const pageContent = isPageLoading ? loadingPageContent : loadedPageContent;

  return <LwLayout content={pageContent} />;
};

export default EditLeetCodes;
