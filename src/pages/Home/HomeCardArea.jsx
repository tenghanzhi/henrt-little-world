import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space } from "antd";
import {
  AppstoreOutlined,
  Html5Outlined,
  StarOutlined,
  SmileOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { SiLeetcode } from "react-icons/si";
import HomeCard from "./HomeCard";
import categoryMatrix from "../common/categoryMatrix";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import {
  SET_PORTFOLIO_DATA,
  SET_LEETCODE_DATA,
  SET_APPLICATION_DATA,
  SET_COMPONENT_DATA,
  SET_FAVORITE_DATA,
  SET_BULLETINBOARD_DATA,
} from "../../redux/constants";
import handleMessage from "../utils/handleMessage";
import style from "./style/HomeCardArea.module.css";

const HomeCardArea = () => {
  const dispatch = useDispatch();
  const portfolioData = useSelector((state) => state.portfolioData);
  const leetcodeData = useSelector((state) => state.leetcodeData);
  const applicationData = useSelector((state) => state.applicationData);
  const componentData = useSelector((state) => state.componentData);
  const favoriteData = useSelector((state) => state.favoriteData);
  const bulletinboardData = useSelector((state) => state.bulletinboardData);
  const [isPortfolioDataLoading, setIsPortfolioDataLoading] = useState(true);
  const [isLeetcodeDataLoading, setIsLeetcodeDataLoading] = useState(true);
  const [isApplicationDataLoading, setIsApplicationDataLoading] =
    useState(true);
  const [isComponentDataLoading, setIsComponentDataLoading] = useState(true);
  const [isFavoriteDataLoading, setIsFavoriteDataLoading] = useState(true);
  const [isBulletinboardDataLoading, setIsBulletinboardDataLoading] =
    useState(true);

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchData = async () => {
    const messageKey = "loadingMessage";

    if (portfolioData.data && portfolioData.data !== [])
      setIsPortfolioDataLoading(false);
    if (leetcodeData.data && leetcodeData.data !== [])
      setIsLeetcodeDataLoading(false);
    if (applicationData.data && applicationData.data !== [])
      setIsApplicationDataLoading(false);
    if (componentData.data && componentData.data !== [])
      setIsComponentDataLoading(false);
    if (favoriteData.data && favoriteData.data !== [])
      setIsFavoriteDataLoading(false);
    if (bulletinboardData.data && bulletinboardData.data !== [])
      setIsBulletinboardDataLoading(false);

    const PAGINATION_SETUP = "?pagination[pageSize]=30";

    await Promise.all([
      fetch(`${apiMatrix.PORTFOLIOS_GET_ALL}${PAGINATION_SETUP}`).then(
        (response) => response.json()
      ),
      fetch(`${apiMatrix.LEET_CODES_GET_ALL}${PAGINATION_SETUP}`).then(
        (response) => response.json()
      ),
      fetch(`${apiMatrix.APPLICATIONS_GET_ALL}${PAGINATION_SETUP}`).then(
        (response) => response.json()
      ),
      fetch(`${apiMatrix.COMPONENTS_GET_ALL}${PAGINATION_SETUP}`).then(
        (response) => response.json()
      ),
      fetch(`${apiMatrix.FAVORITE_GET_ALL}${PAGINATION_SETUP}`).then(
        (response) => response.json()
      ),
      fetch(`${apiMatrix.BULLETINBOARD_GET_ALL}${PAGINATION_SETUP}`).then(
        (response) => response.json()
      ),
    ])
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_PORTFOLIO_DATA, payload: response[0] });
          dispatch({ type: SET_LEETCODE_DATA, payload: response[1] });
          dispatch({ type: SET_APPLICATION_DATA, payload: response[2] });
          dispatch({ type: SET_COMPONENT_DATA, payload: response[3] });
          dispatch({ type: SET_FAVORITE_DATA, payload: response[4] });
          dispatch({ type: SET_BULLETINBOARD_DATA, payload: response[5] });
        }
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.LOADING_MESSAGE_ERROR}${error}`
        );
      })
      .finally(() => {
        setIsPortfolioDataLoading(false);
        setIsLeetcodeDataLoading(false);
        setIsApplicationDataLoading(false);
        setIsComponentDataLoading(false);
        setIsFavoriteDataLoading(false);
        setIsBulletinboardDataLoading(false);
      });
  };

  return (
    <Space align="center" wrap className={style.lw_home_cardarea_wrapper}>
      <HomeCard
        title={
          <span>
            <SiLeetcode className={style.lw_home_cardarea_card_icon} />
            {categoryMatrix.LEETCODES}
          </span>
        }
        extra={categoryMatrix.LEETCODES}
        isLoading={isLeetcodeDataLoading}
      />
      <HomeCard
        title={
          <span>
            <AppstoreOutlined className={style.lw_home_cardarea_card_icon} />
            {categoryMatrix.APPLICATIONS}
          </span>
        }
        extra={categoryMatrix.APPLICATIONS}
        isLoading={isApplicationDataLoading}
      />
      <HomeCard
        title={
          <span>
            <Html5Outlined className={style.lw_home_cardarea_card_icon} />
            {categoryMatrix.COMPONENTS}
          </span>
        }
        extra={categoryMatrix.COMPONENTS}
        isLoading={isComponentDataLoading}
      />
      <HomeCard
        title={
          <span>
            <StarOutlined className={style.lw_home_cardarea_card_icon} />
            {categoryMatrix.FAVORITES}
          </span>
        }
        extra={categoryMatrix.FAVORITES}
        isLoading={isFavoriteDataLoading}
      />
      <HomeCard
        title={
          <span>
            <MessageOutlined className={style.lw_home_cardarea_card_icon} />
            {categoryMatrix.BULLETINBOARDS}
          </span>
        }
        extra={categoryMatrix.BULLETINBOARDS}
        isLoading={isBulletinboardDataLoading}
      />
      <HomeCard
        title={
          <span>
            <SmileOutlined className={style.lw_home_cardarea_card_icon} />
            {categoryMatrix.PORTFOLIO}
          </span>
        }
        extra={categoryMatrix.PORTFOLIO}
        isLoading={isPortfolioDataLoading}
      />
    </Space>
  );
};

export default HomeCardArea;
