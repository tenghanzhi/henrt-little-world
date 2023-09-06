import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Skeleton,
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
import handleMessage from "../utils/handleMessage";
import style from "./style/ReviewPortfolio.module.css";

const ReviewPortfolio = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfoData = useSelector((state) => state.userInfoData);
  const selectedPortfolioId = useSelector((state) => state.selectedPortfolioId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedPortfolioData, setFetchedPortfolioData] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const messageKey = "reviewPageLoadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.PORTFOLIOS_GET_BY_ID}/${
          selectedPortfolioId ? selectedPortfolioId : id
        }`
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
  }, [selectedPortfolioId, id]);

  const handleGoback = () => {
    navigate(-1);
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
          bordered={windowWidth > 500 ? true : false}
          column={6}
        >
          {fetchedPortfolioData.projectName && (
            <Descriptions.Item label="Project Name" span={6}>
              {fetchedPortfolioData.projectName}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Start Date" span={6}>
            {fetchedPortfolioData.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="End Date" span={6}>
            {fetchedPortfolioData.endDate
              ? fetchedPortfolioData.endDate
              : "Present"}
          </Descriptions.Item>
          <Descriptions.Item label="Location" span={6}>
            {fetchedPortfolioData.location}
          </Descriptions.Item>
          <Descriptions.Item label="Key Skills" span={6}>
            <ReactMarkdown
              className={style.lw_portfolio_review_md_wrapper}
              children={fetchedPortfolioData.keySkills}
              remarkPlugins={[remarkGfm]}
            />
          </Descriptions.Item>
          {fetchedPortfolioData.description && (
            <Descriptions.Item
              label={windowWidth > 500 ? "Description" : ""}
              span={6}
            >
              <ReactMarkdown
                className={style.lw_portfolio_review_md_wrapper}
                children={fetchedPortfolioData?.description}
                remarkPlugins={[remarkGfm]}
              />
            </Descriptions.Item>
          )}
          {fetchedPortfolioData.jobContent && (
            <Descriptions.Item
              label={windowWidth > 500 ? "Job Contents" : ""}
              span={6}
            >
              <ReactMarkdown
                className={style.lw_portfolio_review_md_wrapper}
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
