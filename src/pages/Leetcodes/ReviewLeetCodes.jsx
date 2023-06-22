import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Skeleton,
  message,
  Descriptions,
  Button,
  Popconfirm,
  Input,
} from "antd";
import {
  EditOutlined,
  RollbackOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import password from "../common/password";
import LwLayout from "../common/LwLayout";
import style from "./style/ReviewLeetCodes.module.css";

const ReviewLeetCodes = () => {
  const navigate = useNavigate();
  const selectedLeetcodeId = useSelector((state) => state.selectedLeetcodeId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedLeetcodeData, setFetchedLeetcodeData] = useState({});
  const [inputPassword, setInputPassword] = useState(null);

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
    const messageKey = "reviewPageLoadingMessage";

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
        setIsReviewPageLoading(false);
      });
  };

  const handlePasswordValueChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleConfirmPassword = () => {
    const messageKey = "passwordResult";

    if (inputPassword !== null && inputPassword === password) {
      handleMessage(
        messageKey,
        "success",
        messageMatrix.PASSWORD_RESULT_SCCESS
      );
      navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/editLeetCodes`);
    } else {
      handleMessage(messageKey, "error", messageMatrix.PASSWORD_RESULT_ERROR);
      setInputPassword(null);
    }
  };

  const handleCancelPassword = () => {
    setInputPassword(null);
  };

  const loadedPageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_leetcode_review_leetcode_header}
      >
        Review LeetCode Problem {fetchedLeetcodeData.leetcodeIndex}.{" "}
        {fetchedLeetcodeData.title}
      </Typography.Title>
      <Descriptions bordered column={6}>
        <Descriptions.Item label="LeedCode Index" span={1}>
          {fetchedLeetcodeData?.leetcodeIndex?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Title" span={5}>
          {fetchedLeetcodeData?.title?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Difficulty" span={1}>
          {fetchedLeetcodeData?.difficulty?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="First Completed Date" span={4}>
          {fetchedLeetcodeData?.firstCompletedDate?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="LeetCode Page" span={1}>
          <Button
            type="link"
            onClick={() => {
              window.open(fetchedLeetcodeData?.link?.toString());
            }}
          >
            Check
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="Problem Type" span={6}>
          {fetchedLeetcodeData?.type?.toString()}
        </Descriptions.Item>
        {fetchedLeetcodeData?.issue && (
          <Descriptions.Item label="Problem Content" span={6}>
            <ReactMarkdown
              children={fetchedLeetcodeData?.issue}
              remarkPlugins={[remarkGfm]}
            />
          </Descriptions.Item>
        )}
        {fetchedLeetcodeData?.solutionOne && (
          <Descriptions.Item label="Problem Solution One" span={6}>
            <CodeMirror
              value={fetchedLeetcodeData?.solutionOne}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              editable={false}
            />
          </Descriptions.Item>
        )}
        {fetchedLeetcodeData?.solutionTwo && (
          <Descriptions.Item label="Problem Solution Two" span={4}>
            <CodeMirror
              value={fetchedLeetcodeData?.solutionTwo}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              editable={false}
            />
          </Descriptions.Item>
        )}
      </Descriptions>
      <div className={style.lw_leetcodes_review_leetcode_wrapper}>
        <Button
          className={style.lw_leetcodes_review_leetcode_btns}
          type="default"
          onClick={handleGoback}
          icon={<RollbackOutlined />}
        >
          Back
        </Button>
        <Popconfirm
          title={"Please input password to edit."}
          className={style.lw_leetcodes_review_leetcode_btns}
          placement="top"
          description={
            <>
              <Input.Password
                placeholder="Input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => handlePasswordValueChange(e)}
                allowClear={true}
                value={inputPassword}
                onPressEnter={handleConfirmPassword}
              />
            </>
          }
          onConfirm={handleConfirmPassword}
          onCancel={handleCancelPassword}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Button type="primary" icon={<EditOutlined />}>
            Edit
          </Button>
        </Popconfirm>
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
