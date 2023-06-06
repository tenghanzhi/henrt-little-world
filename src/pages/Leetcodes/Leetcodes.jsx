import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import LeetcodesTable from "./LeetcodesTable";
import LwLayout from "../common/LwLayout";
import { SET_LEETCODE_DATA } from "../../redux/constants";

const Leetcodes = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const leetcodeData = useSelector((state) => state.leetcodeData);

  useEffect(() => {
    handleGetLeetcodeData();
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

  const handleGetLeetcodeData = () => {
    handleMessage("loading");
    if (leetcodeData.data !== []) {
      setIsLoading(false);
    }

    (async () => {
      const response = await fetch(apiMatrix.LEET_CODES_GET_ALL);
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_LEETCODE_DATA, payload: response });
          handleMessage("success");
        }
      })
      .catch((error) => {
        handleMessage("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return <LwLayout content={<LeetcodesTable data={leetcodeData} />} />;
};

export default Leetcodes;
