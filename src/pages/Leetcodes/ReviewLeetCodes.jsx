import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Skeleton,
  message,
  Descriptions,
  Button,
  Tooltip,
} from "antd";
import { EditOutlined, RollbackOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import CopyButton from "../common/CopyButton";
import OpenLinkButton from "../common/OpenLinkButton";
import LwLayout from "../common/LwLayout";
import style from "./style/ReviewLeetCodes.module.css";

const ReviewLeetCodes = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);
  const selectedLeetcodeId = useSelector((state) => state.selectedLeetcodeId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedLeetcodeData, setFetchedLeetcodeData] = useState({});

  useEffect(() => {
    handleGetLeetcodeDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoback = () => {
    navigate(-1);
  };

  const handleMessage = (key, type, content) => {
    const messageDuration = 2;

    switch (type) {
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
    const messageKey = "reviewPageLoadingMessage";

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
        setIsReviewPageLoading(false);
      });
  };

  const handleEditBtnOnClick = () => {
    navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/editLeetCodes`);
  };

  const loadedPageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_leetcode_review_leetcode_header}
      >
        {fetchedLeetcodeData.leetcodeIndex}. {fetchedLeetcodeData.title}
      </Typography.Title>
      <Descriptions
        bordered
        column={4}
        labelStyle={{
          color: globalStyleMatrix.COLORS.titleFontColor,
          fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
        }}
        contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
        className={style.lw_leetcode_review_leetcode_description_wrapper}
      >
        <Descriptions.Item label="LeedCode Index" span={4}>
          {fetchedLeetcodeData?.leetcodeIndex?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Title" span={4}>
          {fetchedLeetcodeData?.title?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Difficulty" span={4}>
          {fetchedLeetcodeData?.difficulty?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="First Completed Date" span={4}>
          {fetchedLeetcodeData?.firstCompletedDate?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Created Date" span={4}>
          {fetchedLeetcodeData?.createdAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label="Updated Date" span={4}>
          {fetchedLeetcodeData?.updatedAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label="LeetCode Page" span={4}>
          {fetchedLeetcodeData?.link?.toString()}
          <OpenLinkButton link={fetchedLeetcodeData?.link} />
          <CopyButton data={fetchedLeetcodeData?.link} />
        </Descriptions.Item>
        <Descriptions.Item label="Problem Type" span={4}>
          {fetchedLeetcodeData?.type?.toString()}
        </Descriptions.Item>
        {fetchedLeetcodeData?.issue && (
          <Descriptions.Item label="Problem Content" span={4}>
            <ReactMarkdown
              children={fetchedLeetcodeData?.issue}
              remarkPlugins={[remarkGfm]}
            />
            <CopyButton data={fetchedLeetcodeData?.issue} />
          </Descriptions.Item>
        )}
        {fetchedLeetcodeData?.solutionOne && (
          <Descriptions.Item label="Problem Solution One" span={4}>
            <CodeMirror
              value={fetchedLeetcodeData?.solutionOne}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              editable={false}
              theme={vscodeDark}
            />
            <CopyButton data={fetchedLeetcodeData?.solutionOne} />
          </Descriptions.Item>
        )}
        {fetchedLeetcodeData?.solutionTwo && (
          <Descriptions.Item label="Problem Solution Two" span={4}>
            <CodeMirror
              value={fetchedLeetcodeData?.solutionTwo}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              editable={false}
              theme={vscodeDark}
            />
            <CopyButton data={fetchedLeetcodeData?.solutionTwo} />
          </Descriptions.Item>
        )}
      </Descriptions>
      <div className={style.lw_leetcodes_review_leetcode_btn_wrapper}>
        <Button
          className={style.lw_leetcodes_review_leetcode_btns}
          type="default"
          onClick={handleGoback}
          icon={<RollbackOutlined />}
        >
          Back
        </Button>
        <Tooltip
          title={
            !userInfoData.jwt ? "Please login with admin account to edit" : ""
          }
        >
          <Button
            className={style.lw_leetcodes_review_leetcode_btns}
            type="primary"
            onClick={handleEditBtnOnClick}
            icon={<EditOutlined />}
            disabled={!userInfoData.jwt}
          >
            Edit
          </Button>
        </Tooltip>
      </div>
    </>
  );

  const loadingPageContent = <Skeleton />;

  const pageContent = isReviewPageLoading
    ? loadingPageContent
    : loadedPageContent;

  return <LwLayout content={pageContent} />;
};

export default ReviewLeetCodes;
