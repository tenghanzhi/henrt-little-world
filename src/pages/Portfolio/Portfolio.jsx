import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import PortfolioCard from "./PortfolioCard";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import sortArrayObjByDate from "../utils/sortArrayObjByDate";
import handleClickLinkFromHome from "../utils/handleClickLinkFromHome";
import LwLayout from "../common/LwLayout";
import { SET_PORTFOLIO_DATA } from "../../redux/constants";

const Portfolio = () => {
  const dispatch = useDispatch();
  const portfolioData = useSelector((state) => state.portfolioData);
  const clickedHomePageItemId = useSelector(
    (state) => state.clickedHomePageItemId
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetPortfolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (portfolioData.data !== []) {
      setIsLoading(false);
      handleClickLinkFromHome(clickedHomePageItemId);
    }

    (async () => {
      const response = await fetch(apiMatrix.PORTFOLIOS_GET_ALL);
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_PORTFOLIO_DATA, payload: response });
          handleMessage("success");
          handleClickLinkFromHome(clickedHomePageItemId);
        }
      })
      .catch((error) => {
        handleMessage("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const pageContent = sortArrayObjByDate(portfolioData.data).map((item) => {
    return (
      <>
        <PortfolioCard
          data={item.attributes}
          dataId={item.id}
          cardKey={item.id}
          isLoading={isLoading}
        />
      </>
    );
  });

  return <LwLayout content={pageContent} />;
};

export default Portfolio;
