import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import LwLayout from "../common/LwLayout";

const EditPortfolio = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditPageLoading, setIsEditPageLoading] = useState(true);
  const [fetchedPortfolioData, setFetchedPortfolioData] = useState({});
  const editPortfolioId = useSelector((state) => state.editPortfolioId);

  useEffect(() => {
    handleGetPortfolioDataById();
  }, []);

  const handleMessage = (type) => {
    const messageKey = "editPageLoadingMessage";
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

  const handleGetPortfolioDataById = () => {
    handleMessage("loading");

    (async () => {
      const response = await fetch(apiMatrix.GET_BY_ID + editPortfolioId);
      return response.json();
    })()
      .then((response) => {
        handleMessage("success");
        setFetchedPortfolioData(response.data.attributes);
      })
      .catch((error) => {
        console.log(error);
        handleMessage("error");
      })
      .finally(() => {
        setIsEditPageLoading(false);
        handleMessage("destroy");
      });
  };
  console.log({ fetchedPortfolioData });
  return (
    <>
      {contextHolder}
      <LwLayout />
    </>
  );
};

export default EditPortfolio;
