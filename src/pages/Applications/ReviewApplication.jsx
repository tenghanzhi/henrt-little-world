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
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import password from "../common/password";
import LwLayout from "../common/LwLayout";
import style from "./style/ReviewApplication.module.css";

const ReviewApplication = () => {
  const navigate = useNavigate();
  const selectedApplicationId = useSelector(
    (state) => state.selectedApplicationId
  );
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedApplicationData, setFetchedApplicationData] = useState({});
  const [inputPassword, setInputPassword] = useState(null);

  useEffect(() => {
    handleGetApplicationDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoback = () => {
    navigate(-1);
  };

  const handleMessage = (type, key, content) => {
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

  const handleGetApplicationDataById = () => {
    const messageKey = "reviewPageLoadingMessage";
    handleMessage("loading", messageKey, messageMatrix.LOADING_MESSAGE_LOADING);

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
          "error",
          messageKey,
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
    if (inputPassword !== null && inputPassword === password) {
      handleMessage(
        "passwordResult",
        "success",
        messageMatrix.PASSWORD_RESULT_SCCESS
      );
      navigate(
        `/${categoryMatrix.APPLICATIONS.toLowerCase()}/editApplications`
      );
    } else {
      handleMessage(
        "passwordResult",
        "error",
        messageMatrix.PASSWORD_RESULT_ERROR
      );
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
        className={style.lw_applications_review_leetcode_header}
      >
        Review LeetCode Problem {fetchedApplicationData.name}.{" "}
        {fetchedApplicationData.title}
      </Typography.Title>
      <Descriptions bordered column={6}>
        <Descriptions.Item label="Application Name" span={3}>
          {fetchedApplicationData?.name?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={3}>
          {fetchedApplicationData?.type?.toString()}
        </Descriptions.Item>
        {fetchedApplicationData?.description && (
          <Descriptions.Item label="Problem Content" span={6}>
            <CodeMirror
              value={fetchedApplicationData?.description}
              height="auto"
              editable={false}
              basicSetup={{ lineNumbers: false }}
            />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeOne && (
          <Descriptions.Item label="Code One" span={6}>
            <CodeMirror
              value={fetchedApplicationData?.codeOne}
              extensions={[javascript({ jsx: true })]}
              height="auto"
              editable={false}
            />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeTwo && (
          <Descriptions.Item label="Code Two" span={6}>
            <CodeMirror
              value={fetchedApplicationData?.codeTwo}
              extensions={[javascript({ jsx: true })]}
              height="auto"
              editable={false}
            />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeThree && (
          <Descriptions.Item label="Code Three" span={6}>
            <CodeMirror
              value={fetchedApplicationData?.codeThree}
              extensions={[javascript({ jsx: true })]}
              height="auto"
              editable={false}
            />
          </Descriptions.Item>
        )}
      </Descriptions>
      <div className={style.lw_applications_review_leetcode_wrapper}>
        <Button
          className={style.lw_applications_review_leetcode_btns}
          type="default"
          onClick={handleGoback}
          icon={<RollbackOutlined />}
        >
          Back
        </Button>
        <Popconfirm
          title={"Please input password to edit."}
          className={style.lw_applications_review_leetcode_btns}
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

export default ReviewApplication;
