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
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import LwLayout from "../common/LwLayout";
import style from "./style/ReviewFavorites.module.css";

const ReviewFavorites = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);
  const selectedFavoriteId = useSelector((state) => state.selectedFavoriteId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedFavoriteData, setFetchedFavoriteData] = useState({});

  useEffect(() => {
    handleGetFavoriteDataById();
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

  const handleGetFavoriteDataById = () => {
    const messageKey = "reviewPageLoadingMessage";

    handleMessage(messageKey, "loading", messageMatrix.LOADING_MESSAGE_LOADING);

    (async () => {
      const response = await fetch(
        `${apiMatrix.FAVORITE_GET_BY_ID}/${selectedFavoriteId}`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
        }
        setFetchedFavoriteData(response.data.attributes);
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
    navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/editFavorites`);
  };

  const loadedPageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_favorite_review_favorite_header}
      >
        Review Favorite {fetchedFavoriteData.name}
      </Typography.Title>
      <Descriptions
        bordered
        column={4}
        labelStyle={{
          color: globalStyleMatrix.COLORS.titleFontColor,
          fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
        }}
        contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
      >
        <Descriptions.Item label="Name" span={4}>
          {fetchedFavoriteData?.name?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={4}>
          {fetchedFavoriteData?.type?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Source Website" span={4}>
          <Button
            type="link"
            onClick={() => {
              window.open(fetchedFavoriteData?.link?.toString());
            }}
          >
            Check
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="Created Date" span={4}>
          {fetchedFavoriteData?.createdAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label="Updated Date" span={4}>
          {fetchedFavoriteData?.updatedAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        {fetchedFavoriteData?.description && (
          <Descriptions.Item label="Problem Content" span={4}>
            <ReactMarkdown
              children={fetchedFavoriteData?.description}
              remarkPlugins={[remarkGfm]}
            />
          </Descriptions.Item>
        )}
      </Descriptions>
      <div className={style.lw_favorites_review_favoritee_wrapper}>
        <Button
          className={style.lw_favorites_review_favorite_btns}
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
            className={style.lw_favorites_review_favorite_btns}
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

export default ReviewFavorites;
