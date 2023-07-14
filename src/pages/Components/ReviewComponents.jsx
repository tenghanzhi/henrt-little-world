import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Skeleton,
  message,
  Descriptions,
  Button,
  Card,
  ConfigProvider,
  Tooltip,
} from "antd";
import { EditOutlined, RollbackOutlined } from "@ant-design/icons";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { html } from "@codemirror/lang-html";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import LwLayout from "../common/LwLayout";
import style from "./style/ReviewComponent.module.css";

const ReviewComponents = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);
  const selectedComponentId = useSelector((state) => state.selectedComponentId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedComponentData, setFetchedComponentData] = useState({});
  const [codeTabactiveKey, setCodeTabactiveKey] = useState("htmlCode");

  useEffect(() => {
    handleGetComponentDataById();
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

  const handleGetComponentDataById = () => {
    const messageKey = "reviewPageLoadingMessage";

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
        setIsReviewPageLoading(false);
      });
  };

  const handleEditBtnOnClick = () => {
    navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/editComponents`);
  };

  const handleCodeTabChange = (key) => {
    setCodeTabactiveKey(key);
  };

  const cssCode = fetchedComponentData?.cssCode
    ? fetchedComponentData?.cssCode
    : "<style></style>";
  const jsCode = fetchedComponentData?.jsCode
    ? fetchedComponentData?.jsCode
    : "<script></script>";
  const htmlCode = fetchedComponentData?.htmlCode
    ? fetchedComponentData?.htmlCode
    : "<head></head><body></body>";

  const indexHead = htmlCode?.indexOf("</head>");
  const combinedCssCode = `${htmlCode?.slice(0, indexHead)}
  <style>${cssCode}</style>
  ${htmlCode?.slice(indexHead)}`;

  const indexBody = combinedCssCode?.indexOf("</body>");
  const combinedJsCode = `${combinedCssCode?.slice(0, indexBody)}
  <script>${jsCode}</script>
  ${combinedCssCode?.slice(indexBody)}`;

  const codeCardTabList = [
    {
      key: "htmlCode",
      label: `HTML`,
    },
    {
      key: "cssCode",
      label: `CSS`,
    },
    {
      key: "jsCode",
      label: `JS`,
    },
  ];

  const codeCardContentList = {
    htmlCode: fetchedComponentData?.htmlCode ? (
      <CodeMirror
        value={fetchedComponentData?.htmlCode}
        extensions={[html(), EditorView.lineWrapping]}
        height="auto"
        editable={false}
        theme={vscodeDark}
      />
    ) : (
      <>No Code Here :(</>
    ),
    cssCode: fetchedComponentData?.cssCode ? (
      <CodeMirror
        value={fetchedComponentData?.cssCode}
        extensions={[html(), EditorView.lineWrapping]}
        height="auto"
        editable={false}
        theme={vscodeDark}
      />
    ) : (
      <>No Code Here :(</>
    ),
    jsCode: fetchedComponentData?.jsCode ? (
      <CodeMirror
        value={fetchedComponentData?.jsCode}
        extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
        height="auto"
        editable={false}
        theme={vscodeDark}
      />
    ) : (
      <>No Code Here :(</>
    ),
  };

  const loadedPageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_components_review_components_header}
      >
        {fetchedComponentData.name}
      </Typography.Title>
      <Descriptions
        bordered
        column={4}
        labelStyle={{
          color: globalStyleMatrix.COLORS.titleFontColor,
          fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
        }}
        contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
        className={style.lw_components_review_components_wrapper}
      >
        <Descriptions.Item label="Name" span={4}>
          {fetchedComponentData?.name?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Source Page" span={4}>
          <Button
            type="link"
            onClick={() => {
              window.open(
                fetchedComponentData?.source?.toString(),
                "_blank",
                "noopener, noreferrer"
              );
            }}
            disabled={!fetchedComponentData?.source}
          >
            {!fetchedComponentData?.source ? `None` : `Check`}
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="Code Type" span={4}>
          {fetchedComponentData?.codeType?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Component Type" span={4}>
          {fetchedComponentData?.componentType?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Created Date" span={4}>
          {fetchedComponentData?.createdAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label="Updated Date" span={4}>
          {fetchedComponentData?.updatedAt?.toString().slice(0, 10)}
        </Descriptions.Item>
      </Descriptions>
      <Card
        className={style.lw_components_review_components_iframe_card}
        bordered={false}
      >
        <iframe
          className={style.lw_components_review_components_iframe}
          title={fetchedComponentData?.name}
          srcDoc={combinedJsCode}
        >
          <p>Your broser does not support iframe tag</p>
        </iframe>
      </Card>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FFFFFF",
          },
        }}
      >
        <Card
          className={style.lw_components_review_components_code_tab}
          tabList={codeCardTabList}
          activeTabKey={codeTabactiveKey}
          onTabChange={handleCodeTabChange}
          headStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          bodyStyle={{
            color: globalStyleMatrix.COLORS.mainFontColor,
            padding: "0px",
          }}
          bordered={false}
        >
          {codeCardContentList[codeTabactiveKey]}
        </Card>
      </ConfigProvider>
      <div className={style.lw_components_review_components_btn_wrapper}>
        <Button
          className={style.lw_components_review_components_btns}
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
            type="primary"
            onClick={handleEditBtnOnClick}
            icon={<EditOutlined />}
            disabled={!userInfoData.jwt}
            className={style.lw_components_review_components_btns}
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

export default ReviewComponents;
