import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Skeleton,
  message,
  Descriptions,
  Button,
  Col,
  Row,
  Image,
  Space,
  Card,
  Tooltip,
} from "antd";
import { EditOutlined, RollbackOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import failPicture from "../common/failPicture";
import LwLayout from "../common/LwLayout";
import style from "./style/ReviewPortfolio.module.css";

const ReviewPortfolio = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);
  const selectedPortfolioId = useSelector((state) => state.selectedPortfolioId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedPortfolioData, setFetchedPortfolioData] = useState({});

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

  const handleEditBtnOnClick = () => {
    navigate(`/${categoryMatrix.PORTFOLIO.toLowerCase()}/editPortfolio`);
  };

  const loadedPageContent = (
    <>
      <Card
        className={style.lw_portfolio_review_card}
        headStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
        bodyStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
        bordered={false}
      >
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
          className={style.lw_portfolio_review_wrapper}
          labelStyle={{
            color: globalStyleMatrix.COLORS.titleFontColor,
            fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
          }}
          contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
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
            <ReactMarkdown
              children={fetchedPortfolioData.keySkills}
              remarkPlugins={[remarkGfm]}
            />
          </Descriptions.Item>
          {fetchedPortfolioData.description && (
            <Descriptions.Item label="Description" span={4}>
              <ReactMarkdown
                children={fetchedPortfolioData?.description}
                remarkPlugins={[remarkGfm]}
              />
            </Descriptions.Item>
          )}
          {fetchedPortfolioData.jobContent && (
            <Descriptions.Item label="Job Contents" span={4}>
              <ReactMarkdown
                children={fetchedPortfolioData.jobContent}
                remarkPlugins={[remarkGfm]}
              />
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
      <div className={style.lw_portfolio_review_portfolio_btn_wrapper}>
        <Button
          className={style.lw_portfolio_review_portfolio_btns}
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
            className={style.lw_portfolio_review_portfolio_btns}
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

export default ReviewPortfolio;
