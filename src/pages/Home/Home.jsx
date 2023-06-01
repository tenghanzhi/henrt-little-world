import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import {
  GithubOutlined,
  CodeOutlined,
  AppstoreOutlined,
  Html5Outlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";
import HomeCard from "./HomeCard";
import LwLayout from "../common/LwLayout";
import categoryMatrix from "../common/categoryMatrix";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import {
  SET_PORTFOLIO_DATA,
  SET_CLICKED_HOME_PAGE_ITEM_ID,
} from "../../redux/constants";
import style from "./style/Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const portfolioData = useSelector((state) => state.portfolioData);
  const clickedHomePageItemId = useSelector(
    (state) => state.clickedHomePageItemId
  );
  const [isPortfolioDataLoading, setIsPortfolioDataLoading] = useState(true);

  useEffect(() => {
    handleGetPortfolioData();
    handleComeBackFromPrePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComeBackFromPrePage = () => {
    if (clickedHomePageItemId) {
      dispatch({ type: SET_CLICKED_HOME_PAGE_ITEM_ID, payload: null });
      window.scrollTo(0, 0);
    }
  };

  const handleMessage = (type, content) => {
    const messageKey = "loadingMessage";
    const messageDuration = 2;

    switch (type) {
      case "loading": {
        message.loading({
          key: messageKey,
          content: messageMatrix.LOADING_MESSAGE_LOADING,
        });
        break;
      }
      case "success": {
        message.success({
          key: messageKey,
          content: messageMatrix.LOADING_MESSAGE_SUCCESS,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        message.error({
          key: messageKey,
          content: messageMatrix.LOADING_MESSAGE_ERROR + content,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handleGetPortfolioData = () => {
    handleMessage("loading");
    if (portfolioData && portfolioData.data !== [])
      setIsPortfolioDataLoading(false);

    (async () => {
      const response = await fetch(apiMatrix.GET_ALL);
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_PORTFOLIO_DATA, payload: response });
          handleMessage("success");
        }
      })
      .catch((error) => {
        handleMessage("error", error);
      })
      .finally(() => {
        setIsPortfolioDataLoading(false);
      });
  };

  const pageContent = (
    <>
      <HomeCard
        title={
          <span>
            <UserOutlined className={style.lw_home_card_icon} />
            {categoryMatrix.PORTFOLIO}
          </span>
        }
        extra={categoryMatrix.PORTFOLIO}
        isLoading={isPortfolioDataLoading}
      />
      <HomeCard
        title={
          <span>
            <Html5Outlined className={style.lw_home_card_icon} />
            {categoryMatrix.COMPONENTS}
          </span>
        }
        extra={categoryMatrix.COMPONENTS}
      />
      <HomeCard
        title={
          <span>
            <AppstoreOutlined className={style.lw_home_card_icon} />
            {categoryMatrix.APPLICATIONS}
          </span>
        }
        extra={categoryMatrix.APPLICATIONS}
      />
      <HomeCard
        title={
          <span>
            <CodeOutlined className={style.lw_home_card_icon} />
            {categoryMatrix.LEETCODES}
          </span>
        }
        extra={categoryMatrix.LEETCODES}
      />
      <HomeCard
        title={
          <span>
            <GithubOutlined className={style.lw_home_card_icon} />
            {categoryMatrix.GITHUB}
          </span>
        }
        extra={categoryMatrix.GITHUB}
      />
      <HomeCard
        title={
          <span>
            <StarOutlined className={style.lw_home_card_icon} />
            {categoryMatrix.MORE}
          </span>
        }
        extra={categoryMatrix.MORE}
      />
    </>
  );

  return (
    <LwLayout
      direction="horizontal"
      content={pageContent}
      pageKey={categoryMatrix.HOME}
    />
  );
};

export default Home;
