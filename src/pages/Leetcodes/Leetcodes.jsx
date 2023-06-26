import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  message,
  Space,
  Button,
  Input,
  InputNumber,
  Select,
  Tooltip,
} from "antd";
import { PlusOutlined, CodeOutlined } from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import LeetCodesTable from "./LeetCodesTable";
import LwLayout from "../common/LwLayout";
import {
  SET_LEETCODE_DATA,
  SET_LEETCOD_TABLE_FILTER,
} from "../../redux/constants";
import style from "./style/LeetCodes.module.css";

const LeetCodes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);
  const leetcodeData = useSelector((state) => state.leetcodeData);
  const leetcodeTablePagenation = useSelector(
    (state) => state.leetcodeTablePagenation
  );
  const leetcodeTableSorter = useSelector((state) => state.leetcodeTableSorter);
  const leetcodeTableFilter = useSelector((state) => state.leetcodeTableFilter);
  const [inputSearch, setInputSearch] = useState(null);
  const [searchType, setSearchType] = useState(null);

  useEffect(() => {
    handleClearSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetLeetcodeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leetcodeTablePagenation, leetcodeTableSorter, leetcodeTableFilter]);

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

  const handleBtnOnClick = (type) => {
    switch (type.toLowerCase()) {
      case "lc en":
        window.open("https://leetcode.com/problemset/all/");
        break;
      case "lc cn":
        window.open("https://leetcode.cn/problemset/all/");
        break;
      case "nc":
        window.open("https://neetcode.io/roadmap");
        break;
      case "create":
        navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/createLeetCodes`);
        break;
      default:
        return null;
    }
  };

  const handleGetLeetcodeData = () => {
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
        handleMessage(messageKey, "error", error);
      });
  };

  const handleSearchPlaceholder = () => {
    switch (searchType) {
      case "title":
        return "Input problem title";
      case "index":
        return "Input problem LeetCode index";
      default:
        return "Please select a search by type to search";
    }
  };

  const handleSearchTypeChange = (value) => {
    setInputSearch(null);
    dispatch({
      type: SET_LEETCOD_TABLE_FILTER,
      payload: {
        difficulty: null,
        type: null,
        leetcodeIndex: null,
        title: null,
      },
    });
    setSearchType(value);
  };

  const handleSearchValueChange = (e) => {
    switch (searchType) {
      case "index":
        setInputSearch(e);
        dispatch({
          type: SET_LEETCOD_TABLE_FILTER,
          payload: {
            difficulty: leetcodeTableFilter.difficulty,
            type: leetcodeTableFilter.type,
            leetcodeIndex: e,
            title: leetcodeTableFilter.title,
          },
        });
        break;
      case "title":
        setInputSearch(e.target.value);
        dispatch({
          type: SET_LEETCOD_TABLE_FILTER,
          payload: {
            difficulty: leetcodeTableFilter.difficulty,
            type: leetcodeTableFilter.type,
            leetcodeIndex: leetcodeTableFilter.leetcodeIndex,
            title: e.target.value,
          },
        });
        break;
      default:
        break;
    }
  };

  const handleClearSearchResult = () => {
    setInputSearch(null);
    dispatch({
      type: SET_LEETCOD_TABLE_FILTER,
      payload: {
        difficulty: null,
        type: null,
        leetcodeIndex: null,
        title: null,
      },
    });
    setSearchType(null);
  };

  const searchOptions = [
    {
      label: "Search by Index",
      value: "index",
    },
    {
      label: "Search by Tiitle",
      value: "title",
    },
  ];

  const pageContent = (
    <Space direction="vertical" wrap align="start">
      <Space wrap className={style.lw_leetcode_btn_wrapper}>
        <Tooltip
          title={
            !userInfoData.jwt ? "Please login with admin account to create" : ""
          }
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleBtnOnClick("create")}
            disabled={!userInfoData.jwt}
          >
            Create New
          </Button>
        </Tooltip>
        <Button
          type="default"
          icon={<CodeOutlined />}
          onClick={() => handleBtnOnClick("lc cn")}
        >
          LeetCode CN
        </Button>
        <Button
          type="default"
          icon={<CodeOutlined />}
          onClick={() => handleBtnOnClick("lc en")}
        >
          LeetCode EN
        </Button>
        <Button
          type="default"
          icon={<CodeOutlined />}
          onClick={() => handleBtnOnClick("nc")}
        >
          NeetCode
        </Button>
        <Select
          className={style.lw_leetcode_search_type_selector}
          placeholder="Search by"
          options={searchOptions}
          onChange={(value) => handleSearchTypeChange(value)}
          onClear={handleClearSearchResult}
          value={searchType}
          allowClear
        />
        {searchType === "index" && (
          <InputNumber
            className={style.lw_leetcode_search}
            placeholder={handleSearchPlaceholder()}
            onChange={(e) => handleSearchValueChange(e)}
            disabled={!searchType}
            value={inputSearch}
            min={0}
            max={9999}
            allowClear
          />
        )}
        {searchType === "title" && (
          <Input
            className={style.lw_leetcode_search}
            placeholder={handleSearchPlaceholder()}
            onChange={(e) => handleSearchValueChange(e)}
            disabled={!searchType}
            value={inputSearch}
            allowClear
          />
        )}
        {searchType && (
          <Button
            danger
            onClick={handleClearSearchResult}
            disabled={!inputSearch}
          >
            Clear Results
          </Button>
        )}
      </Space>
      <LeetCodesTable data={leetcodeData} />
    </Space>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.LEETCODES} />;
};

export default LeetCodes;
