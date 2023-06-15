import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Space, Button, Popconfirm, Input, Select } from "antd";
import {
  PlusOutlined,
  CodeOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import password from "../common/password";
import LeetCodesTable from "./LeetCodesTable";
import LwLayout from "../common/LwLayout";
import { SET_LEETCODE_DATA } from "../../redux/constants";
import style from "./style/LeetCodes.module.css";

const LeetCodes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leetcodeData = useSelector((state) => state.leetcodeData);
  const leetcodeTablePagenation = useSelector(
    (state) => state.leetcodeTablePagenation
  );
  const [inputPassword, setInputPassword] = useState(null);
  const [inputSearch, setInputSearch] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [searchResult, setSearchResult] = useState({});
  const [isShowingSearchResult, setIsShowingSearchResult] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    if (!isShowingSearchResult) handleGetLeetcodeData();
    else handleGetSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leetcodeTablePagenation]);

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
      default:
        return null;
    }
  };

  const handleGetLeetcodeData = () => {
    (async () => {
      const response = await fetch(
        `${apiMatrix.LEET_CODES_GET_ALL}?pagination[page]=${leetcodeTablePagenation.current}&pagination[pageSize]=${leetcodeTablePagenation.size}`
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
        handleMessage("loadingMessage", "error", error);
      });
  };

  const handlePasswordValueChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleConfirmPassword = () => {
    if (inputPassword !== null && inputPassword === password) {
      handleMessage("passwordResult", "success");
      navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/createLeetCodes`);
    } else {
      handleMessage("passwordResult", "error");
      setInputPassword(null);
    }
  };

  const handleCancelPassword = () => {
    setInputPassword(null);
  };

  const handleSearchPlaceholder = () => {
    switch (searchType) {
      case "title":
        return "Input problem title";
      case "index":
        return "Input problem LeetCode index";
      case "type":
        return "Input problem type";
      default:
        return "Please select a search by type to search";
    }
  };

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
  };

  const handleSearchValueChange = (e) => {
    setInputSearch(e.target.value);
  };

  const handleGetSearchResult = () => {
    let searchUrl;

    switch (searchType) {
      case "index":
        searchUrl = `${apiMatrix.LEET_CODES_GET_ALL}?pagination[page]=${leetcodeTablePagenation.current}&pagination[pageSize]=${leetcodeTablePagenation.size}&filters[leetcodeIndex][$eqi]=${inputSearch}`;
        break;
      case "title":
        searchUrl = `${apiMatrix.LEET_CODES_GET_ALL}?pagination[page]=${leetcodeTablePagenation.current}&pagination[pageSize]=${leetcodeTablePagenation.size}&filters[title][$containsi]=${inputSearch}`;
        break;
      case "type":
        searchUrl = `${apiMatrix.LEET_CODES_GET_ALL}?pagination[page]=${leetcodeTablePagenation.current}&pagination[pageSize]=${leetcodeTablePagenation.size}&filters[type][$containsi]=${inputSearch}`;
        break;
      default:
        break;
    }

    (async () => {
      const response = await fetch(searchUrl);
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          setSearchResult(response);
        }
      })
      .catch((error) => {
        handleMessage("loadingMessage", "error", error);
      })
      .finally(() => setIsLoadingSearch(false));
  };

  const handleSearch = () => {
    if (inputSearch) {
      setIsLoadingSearch(true);
      setIsShowingSearchResult(true);
      handleGetSearchResult();
    } else return null;
  };

  const handleClearSearchResult = () => {
    setSearchResult({});
    setInputSearch(null);
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
    {
      label: "Search by Type",
      value: "type",
    },
  ];

  const pageContent = (
    <Space direction="vertical" wrap align="start">
      <Space wrap className={style.lw_leetcode_btn_wrapper}>
        <Popconfirm
          title={"Please input password to create."}
          placement="topRight"
          description={
            <>
              <Input.Password
                placeholder="Input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => handlePasswordValueChange(e)}
                allowClear={true}
                value={inputPassword}
                onPressEnter={handleConfirmPassword}
              />
            </>
          }
          onConfirm={handleConfirmPassword}
          onCancel={handleCancelPassword}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleBtnOnClick("create")}
          >
            Create New
          </Button>
        </Popconfirm>
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
        <Input.Search
          className={style.lw_leetcode_search}
          addonBefore={
            <Select
              className={style.lw_leetcode_search_type_selector}
              placeholder="Search by"
              options={searchOptions}
              onChange={(value) => handleSearchTypeChange(value)}
              onClear={handleClearSearchResult}
              value={searchType}
              allowClear
            ></Select>
          }
          placeholder={handleSearchPlaceholder()}
          onChange={(e) => handleSearchValueChange(e)}
          value={inputSearch}
          enterButton
          disabled={!searchType}
          onSearch={handleSearch}
          loading={isLoadingSearch}
        />
        <Button
          danger
          onClick={handleClearSearchResult}
          disabled={JSON.stringify(searchResult) === "{}"}
        >
          Clear Results
        </Button>
      </Space>
      <LeetCodesTable
        data={
          JSON.stringify(searchResult) === "{}" ? leetcodeData : searchResult
        }
      />
    </Space>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.LEETCODES} />;
};

export default LeetCodes;
