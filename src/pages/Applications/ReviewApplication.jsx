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
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
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

  const handleGetApplicationDataById = () => {
    const messageKey = "reviewPageLoadingMessage";
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
      navigate(
        `/${categoryMatrix.APPLICATIONS.toLowerCase()}/editApplications`
      );
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
        className={style.lw_applications_review_applications_header}
      >
        Review Application {fetchedApplicationData.name}
      </Typography.Title>
      <Descriptions
        bordered
        column={6}
        labelStyle={{
          color: globalStyleMatrix.COLORS.titleFontColor,
          fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
        }}
        contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
      >
        <Descriptions.Item label="Application Name" span={3}>
          {fetchedApplicationData?.name?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={2}>
          {fetchedApplicationData?.type?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Source" span={1}>
          {fetchedApplicationData?.source ? (
            <Button
              type="link"
              onClick={() => {
                window.open(fetchedApplicationData?.source?.toString());
              }}
            >
              Check
            </Button>
          ) : (
            "None"
          )}
        </Descriptions.Item>
        {fetchedApplicationData?.description && (
          <Descriptions.Item label="Problem Content" span={6}>
            <ReactMarkdown
              children={fetchedApplicationData?.description}
              remarkPlugins={[remarkGfm]}
            />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeOne && (
          <Descriptions.Item label="Code One" span={6}>
            <CodeMirror
              value={fetchedApplicationData?.codeOne}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              editable={false}
              theme={vscodeDark}
            />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeTwo && (
          <Descriptions.Item label="Code Two" span={6}>
            <CodeMirror
              value={fetchedApplicationData?.codeTwo}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              editable={false}
              theme={vscodeDark}
            />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeThree && (
          <Descriptions.Item label="Code Three" span={6}>
            <CodeMirror
              value={fetchedApplicationData?.codeThree}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              maxWidth="1200px"
              editable={false}
              theme={vscodeDark}
            />
          </Descriptions.Item>
        )}
      </Descriptions>
      <div className={style.lw_applications_review_applications_wrapper}>
        <Button
          className={style.lw_applications_review_applications_btns}
          type="default"
          onClick={handleGoback}
          icon={<RollbackOutlined />}
        >
          Back
        </Button>
        <Popconfirm
          title={"Please input password to edit."}
          className={style.lw_applications_review_applications_btns}
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
