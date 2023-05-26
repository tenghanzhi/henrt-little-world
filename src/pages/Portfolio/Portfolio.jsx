import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import PortfolioCard from "./PortfolioCard";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import LwLayout from "../common/LwLayout";
import { SET_PORTFOLIO_DATA } from "../../redux/constants";

const Portfolio = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const portfolioData = useSelector((state) => state.portfolioData);
  const clickedHomePageItemId = useSelector(
    (state) => state.clickedHomePageItemId
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetPortfolioData();
  }, []);

  const handleClickLinkFromHome = () => {
    if (clickedHomePageItemId) {
      const element = document.querySelector("#" + clickedHomePageItemId);
      const yOffset = -74;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleMessage = (type) => {
    const messageKey = "loadingMessage";
    const messageDuration = 2;

    switch (type) {
      case "loading": {
        messageApi.open({
          key: messageKey,
          type: "loading",
          content: messageMatrix.LOADING_MESSAGE_LOADING,
        });
        break;
      }
      case "success": {
        messageApi.open({
          key: messageKey,
          type: "success",
          content: messageMatrix.LOADING_MESSAGE_SUCCESS,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        messageApi.open({
          key: messageKey,
          type: "error",
          content: messageMatrix.LOADING_MESSAGE_ERROR,
          duration: messageDuration,
        });
        break;
      }
      case "destroy": {
        message.destroy(messageKey);
        break;
      }
      default:
        return null;
    }
  };

  const handleGetPortfolioData = () => {
    handleMessage("loading");
    if (portfolioData !== []) {
      setIsLoading(false);
      handleClickLinkFromHome();
    }

    (async () => {
      const response = await fetch(apiMatrix.GET_ALL);
      return response.json();
    })()
      .then((response) => {
        dispatch({ type: SET_PORTFOLIO_DATA, payload: response.data });
        handleMessage("success");
        handleClickLinkFromHome();
      })
      .catch((error) => {
        console.log(error);
        handleMessage("error");
      })
      .finally(() => {
        setIsLoading(false);
        handleMessage("destroy");
      });
  };

  const pageContent = portfolioData.map((item) => {
    return (
      <>
        {contextHolder}
        <PortfolioCard
          data={item.attributes}
          key={item.id}
          isLoading={isLoading}
        />
      </>
    );
  });

  return <LwLayout content={pageContent} />;
};

export default Portfolio;
