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
  Col,
  Row,
  Image,
  Space,
  Card,
} from "antd";
import {
  EditOutlined,
  RollbackOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import failPicture from "../common/failPicture";
import password from "../common/password";
import LwLayout from "../common/LwLayout";
import style from "./style/ReviewPortfolio.module.css";

const ReviewPortfolio = () => {
  const navigate = useNavigate();
  const selectedPortfolioId = useSelector((state) => state.selectedPortfolioId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedPortfolioData, setFetchedPortfolioData] = useState({});
  const [inputPassword, setInputPassword] = useState(null);

  useEffect(() => {
    handleGetPortfolioDataById();
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

  const handleGetPortfolioDataById = () => {
    const messageKey = "reviewPageLoadingMessage";

    handleMessage(messageKey, "loading", messageMatrix.LOADING_MESSAGE_LOADING);

    (async () => {
      const response = await fetch(
        `${apiMatrix.PORTFOLIOS_GET_BY_ID}/${selectedPortfolioId}`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
        }
        setFetchedPortfolioData(response.data.attributes);
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
      navigate(`/${categoryMatrix.PORTFOLIO.toLowerCase()}/editPortfolio`);
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
      <Card>
        <Space align="start" direction="horizontal" wrap={true}>
          <Row>
            <Col className={style.lw_portfolio_review_grid} flex="100px">
              <Image
                width={100}
                height={100}
                src={fetchedPortfolioData.icon}
                fallback={failPicture}
                preview={false}
              />
            </Col>
            <Col className={style.lw_portfolio_review_grid} flex="auto">
              <Typography.Title
                level={3}
                className={style.lw_portfolio_review_title_company_name}
              >
                {fetchedPortfolioData.name}
              </Typography.Title>
              <Typography.Title
                level={5}
                className={style.lw_portfolio_review_title_job_title}
              >
                {fetchedPortfolioData.jobTitle}
              </Typography.Title>
            </Col>
          </Row>
        </Space>
        <Descriptions
          className={style.lw_portfolio_review_outter}
          bordered
          column={4}
        >
          {fetchedPortfolioData.projectName && (
            <Descriptions.Item label="Project Name" span={4}>
              {fetchedPortfolioData.projectName}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Start Date" span={4}>
            {fetchedPortfolioData.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="End Date" span={4}>
            {fetchedPortfolioData.endDate
              ? fetchedPortfolioData.endDate
              : "Present"}
          </Descriptions.Item>
          <Descriptions.Item label="Location" span={4}>
            {fetchedPortfolioData.location}
          </Descriptions.Item>
          <Descriptions.Item label="Key Skills" span={4}>
            {fetchedPortfolioData.keySkills}
          </Descriptions.Item>
          {fetchedPortfolioData.description && (
            <Descriptions.Item label="Description" span={4}>
              <CodeMirror
                value={fetchedPortfolioData?.description}
                extensions={[EditorView.lineWrapping]}
                height="auto"
                editable={false}
                basicSetup={{
                  lineNumbers: false,
                  highlightActiveLine: false,
                  foldGutter: false,
                }}
              />
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Job Contents" span={4}>
            <CodeMirror
              value={fetchedPortfolioData.jobContent}
              extensions={[EditorView.lineWrapping]}
              height="auto"
              editable={false}
              basicSetup={{
                lineNumbers: false,
                highlightActiveLine: false,
                foldGutter: false,
              }}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <div className={style.lw_portfolio_review_portfolio_wrapper}>
        <Button
          className={style.lw_portfolio_review_portfolio_btns}
          type="default"
          onClick={handleGoback}
          icon={<RollbackOutlined />}
        >
          Back
        </Button>
        <Popconfirm
          title={"Please input password to edit."}
          className={style.lw_portfolio_review_portfolio_btns}
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

export default ReviewPortfolio;
