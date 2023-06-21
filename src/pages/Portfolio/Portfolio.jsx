import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { message, Timeline } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import sortArrayObjByDate from "../utils/sortArrayObjByDate";
import LwLayout from "../common/LwLayout";
import {
  SET_PORTFOLIO_DATA,
  SET_SELECTED_PORTFOLIO_ID,
} from "../../redux/constants";

const Portfolio = () => {
  const dispatch = useDispatch();
  const portfolioData = useSelector((state) => state.portfolioData);

  useEffect(() => {
    handleGetPortfolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessage = (key, type, content) => {
    const messageDuration = 2;

    switch (type) {
      case "loading": {
        message.loading({
          key: key,
          content: messageMatrix.LOADING_MESSAGE_LOADING,
        });
        break;
      }
      case "success": {
        message.success({
          key: key,
          content: messageMatrix.LOADING_MESSAGE_SUCCESS,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        message.error({
          key: key,
          content: `${messageMatrix.LOADING_MESSAGE_ERROR}${content}`,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handleGetPortfolioData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.PORTFOLIOS_GET_ALL}?pagination[withCount]=false`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_PORTFOLIO_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(messageKey, "error", error);
      });
  };

  const handleTimelineTitleOnClick = (id) => {
    dispatch({ type: SET_SELECTED_PORTFOLIO_ID, payload: id });
  };

  const handleGetTimelineItems = () => {
    let timelineItem = [];
    sortArrayObjByDate(portfolioData.data).map((item) => {
      timelineItem.push({
        label: `${item.attributes.startDate.slice(0, 7)} - ${
          item.attributes.endDate
            ? item.attributes.endDate.slice(0, 7)
            : "Present"
        }`,
        children: (
          <Link
            to={`/${categoryMatrix.PORTFOLIO.toLowerCase()}/reviewPortfolio`}
            onClick={() => handleTimelineTitleOnClick(item.id)}
          >
            {item.attributes.name}
          </Link>
        ),
        color: item.attributes.endDate ? "red" : "green",
      });
      return null;
    });
    return timelineItem;
  };

  console.log({ portfolioData });

  const pageContent = <Timeline mode="left" items={handleGetTimelineItems()} />;

  return <LwLayout content={pageContent} pageKey={categoryMatrix.PORTFOLIO} />;
};

export default Portfolio;
