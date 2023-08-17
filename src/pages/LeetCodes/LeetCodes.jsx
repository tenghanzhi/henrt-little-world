import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import LeetCodesTable from "./LeetCodesTable";
import LeetCodesList from "./LeetCodesList";
import LeetCodesTopBtns from "./LeetCodesTopBtns";
import LeetCodesFilter from "./LeetCodesFilter";
import LeetCodesTableColsController from "./LeetCodesTableColsController";
import LwLayout from "../common/LwLayout";
import { SET_LEETCODE_DATA } from "../../redux/constants";
import handleMessage from "../utils/handleMessage";
import style from "./style/LeetCodes.module.css";

const LeetCodes = () => {
  const dispatch = useDispatch();
  const leetcodeTablePagenation = useSelector(
    (state) => state.leetcodeTablePagenation
  );
  const leetcodeTableSorter = useSelector((state) => state.leetcodeTableSorter);
  const leetcodeTableFilter = useSelector((state) => state.leetcodeTableFilter);

  useEffect(() => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.LEET_CODES_GET_ALL}?pagination[page]=${
          leetcodeTablePagenation.current
        }&pagination[pageSize]=${leetcodeTablePagenation.size}&sort=${
          leetcodeTableSorter.sort
        }${leetcodeTableSorter.order}${
          leetcodeTableFilter.difficulty
            ? `&filters[difficulty][$containsi][0]=${leetcodeTableFilter.difficulty}`
            : ""
        }${
          leetcodeTableFilter.type
            ? `&filters[type][$containsi][1]=${leetcodeTableFilter.type}`
            : ""
        }${
          leetcodeTableFilter.leetcodeIndex
            ? `&filters[leetcodeIndex][$containsi][2]=${leetcodeTableFilter.leetcodeIndex}`
            : ""
        }${
          leetcodeTableFilter.title
            ? `&filters[title][$containsi][3]=${leetcodeTableFilter.title}`
            : ""
        }`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_LEETCODE_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.LOADING_MESSAGE_ERROR}${error}`
        );
      });
  }, [
    dispatch,
    leetcodeTablePagenation,
    leetcodeTableSorter,
    leetcodeTableFilter,
  ]);

  const pageContent = (
    <Space direction="vertical" wrap align="start">
      <Space wrap className={style.lw_leetcode_btn_wrapper}>
        <LeetCodesTopBtns />
        <LeetCodesTableColsController />
        <LeetCodesFilter />
      </Space>
      <LeetCodesTable className={style.lw_leetcode_table} />
      <LeetCodesList className={style.lw_leetcode_list} />
    </Space>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.LEETCODES} />;
};

export default LeetCodes;
