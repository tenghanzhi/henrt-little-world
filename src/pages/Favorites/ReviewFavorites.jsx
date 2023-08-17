import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Skeleton, Descriptions, Button, Tooltip } from "antd";
import { EditOutlined, RollbackOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import CopyButton from "../common/CopyButton";
import OpenLinkButton from "../common/OpenLinkButton";
import LwLayout from "../common/LwLayout";
import handleMessage from "../utils/handleMessage";
import style from "./style/ReviewFavorites.module.css";

const ReviewFavorites = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfoData = useSelector((state) => state.userInfoData);
  const selectedFavoriteId = useSelector((state) => state.selectedFavoriteId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedFavoriteData, setFetchedFavoriteData] = useState({});
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
        `${apiMatrix.FAVORITE_GET_BY_ID}/${
          selectedFavoriteId ? selectedFavoriteId : id
        }`
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
  }, [selectedFavoriteId, id]);

  const handleGoback = () => {
    navigate(-1);
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
        {fetchedFavoriteData.name}
      </Typography.Title>
      <Descriptions
        bordered={windowWidth > 500 ? true : false}
        column={6}
        labelStyle={{
          color: globalStyleMatrix.COLORS.titleFontColor,
          fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
        }}
        contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
        className={style.lw_favorite_review_favorite_wrapper}
      >
        <Descriptions.Item label="Name" span={6}>
          {fetchedFavoriteData?.name?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={6}>
          {fetchedFavoriteData?.type?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Source Website" span={6}>
          <>
            {fetchedFavoriteData?.link?.toString()}
            <OpenLinkButton link={fetchedFavoriteData?.link} />
            <CopyButton data={fetchedFavoriteData?.link} />
          </>
        </Descriptions.Item>
        <Descriptions.Item label="Created Date" span={6}>
          {fetchedFavoriteData?.createdAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label="Updated Date" span={6}>
          {fetchedFavoriteData?.updatedAt?.toString().slice(0, 10)}
        </Descriptions.Item>
        {fetchedFavoriteData?.description && (
          <Descriptions.Item
            label={windowWidth > 500 ? "Description" : ""}
            span={6}
          >
            <ReactMarkdown
              className={style.lw_favorites_review_favorite_md_wrapper}
              children={fetchedFavoriteData?.description}
              remarkPlugins={[remarkGfm]}
            />
            <CopyButton data={fetchedFavoriteData?.description} />
          </Descriptions.Item>
        )}
      </Descriptions>
      <div className={style.lw_favorites_review_favorite_btn_wrapper}>
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
