import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Skeleton,
  Descriptions,
  Button,
  Tooltip,
} from "antd";
import { EditOutlined, RollbackOutlined } from "@ant-design/icons";
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
import CopyButton from "../common/CopyButton";
import OpenLinkButton from "../common/OpenLinkButton";
import LwLayout from "../common/LwLayout";
import handleMessage from "../utils/handleMessage";
import style from "./style/ReviewApplication.module.css";

const ReviewApplication = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);
  const selectedApplicationId = useSelector(
    (state) => state.selectedApplicationId
  );
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedApplicationData, setFetchedApplicationData] = useState({});

  useEffect(() => {
    const messageKey = "reviewPageLoadingMessage";

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
  }, [selectedApplicationId]);

  const handleGoback = () => {
    navigate(-1);
  };

  const handleEditBtnOnClick = () => {
    navigate(`/${categoryMatrix.APPLICATIONS.toLowerCase()}/editApplications`);
  };

  const loadedPageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_applications_review_applications_header}
      >
        {fetchedApplicationData.name}
      </Typography.Title>
      <Descriptions
        bordered
        column={4}
        labelStyle={{
          color: globalStyleMatrix.COLORS.titleFontColor,
          fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
        }}
        contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
        className={style.lw_applications_review_applications_wrapper}
      >
        <Descriptions.Item label="Application Name" span={4}>
          {fetchedApplicationData?.name?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={4}>
          {fetchedApplicationData?.type?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Source" span={4}>
          {fetchedApplicationData?.source ? (
            <>
              {fetchedApplicationData?.source?.toString()}
              <OpenLinkButton link={fetchedApplicationData?.source} />
              <CopyButton data={fetchedApplicationData?.source} />
            </>
          ) : (
            "None"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Created Date" span={4}>
          {fetchedApplicationData?.createdAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label="Updated Date" span={4}>
          {fetchedApplicationData?.updatedAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        {fetchedApplicationData?.description && (
          <Descriptions.Item label="Problem Content" span={4}>
            <ReactMarkdown
              children={fetchedApplicationData?.description}
              remarkPlugins={[remarkGfm]}
            />
            <CopyButton data={fetchedApplicationData?.description} />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeOne && (
          <Descriptions.Item label="Code One" span={4}>
            <CodeMirror
              value={fetchedApplicationData?.codeOne}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              editable={false}
              theme={vscodeDark}
            />
            <CopyButton data={fetchedApplicationData?.codeOne} />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeTwo && (
          <Descriptions.Item label="Code Two" span={4}>
            <CodeMirror
              value={fetchedApplicationData?.codeTwo}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              editable={false}
              theme={vscodeDark}
            />
            <CopyButton data={fetchedApplicationData?.codeTwo} />
          </Descriptions.Item>
        )}
        {fetchedApplicationData?.codeThree && (
          <Descriptions.Item label="Code Three" span={4}>
            <CodeMirror
              value={fetchedApplicationData?.codeThree}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              height="auto"
              maxWidth="1200px"
              editable={false}
              theme={vscodeDark}
            />
            <CopyButton data={fetchedApplicationData?.codeThree} />
          </Descriptions.Item>
        )}
      </Descriptions>
      <div className={style.lw_applications_review_applications_btn_wrapper}>
        <Button
          className={style.lw_applications_review_applications_btns}
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
            className={style.lw_applications_review_applications_btns}
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

export default ReviewApplication;
