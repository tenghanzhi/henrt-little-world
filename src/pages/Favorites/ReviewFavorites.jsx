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
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import password from "../common/password";
import LwLayout from "../common/LwLayout";
import style from "./style/ReviewFavorites.module.css";

const ReviewFavorites = () => {
  const navigate = useNavigate();
  const selectedFavoriteId = useSelector((state) => state.selectedFavoriteId);
  const [isReviewPageLoading, setIsReviewPageLoading] = useState(true);
  const [fetchedFavoriteData, setFetchedFavoriteData] = useState({});
  const [inputPassword, setInputPassword] = useState(null);

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
      navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/editFavorites`);
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
        className={style.lw_favorite_review_favorite_header}
      >
        Review Favorite {fetchedFavoriteData.name}
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
        <Descriptions.Item label="Name" span={6}>
          {fetchedFavoriteData?.name?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={3}>
          {fetchedFavoriteData?.type?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Source Website" span={3}>
          <Button
            type="link"
            onClick={() => {
              window.open(fetchedFavoriteData?.link?.toString());
            }}
          >
            Check
          </Button>
        </Descriptions.Item>
        {fetchedFavoriteData?.description && (
          <Descriptions.Item label="Problem Content" span={6}>
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
        <Popconfirm
          title={"Please input password to edit."}
          className={style.lw_favorites_review_favorite_btns}
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

export default ReviewFavorites;
