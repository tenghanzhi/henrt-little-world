import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const [isPortfolioDataLoading, setIsPortfolioDataLoading] = useState(false);

  useEffect(() => {
    handleGetPortfolioData();
    handleComeBackFromPrePage();
  }, []);

  const handleComeBackFromPrePage = () => {
    if (clickedHomePageItemId) {
      dispatch({ type: SET_CLICKED_HOME_PAGE_ITEM_ID, payload: null });
      window.scrollTo(0, 0);
    }
  };

  const handleGetPortfolioData = () => {
    if (portfolioData && portfolioData === []) setIsPortfolioDataLoading(true);

    (async () => {
      const response = await fetch(apiMatrix.GET_ALL);
      return response.json();
    })()
      .then((response) => {
        dispatch({ type: SET_PORTFOLIO_DATA, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsPortfolioDataLoading(false));
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
