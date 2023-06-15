import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Space, Button, Popconfirm, Input, Select } from "antd";
import {
  PlusOutlined,
  CodeOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  CodeSandboxOutlined,
  CodepenOutlined,
} from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import password from "../common/password";
import ApplicationsTable from "./ApplicationsTable";
import LwLayout from "../common/LwLayout";
import { SET_APPLICATION_DATA } from "../../redux/constants";
import style from "./style/Applications.module.css";

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applicationData = useSelector((state) => state.applicationData);
  const applicationTablePagenation = useSelector(
    (state) => state.applicationTablePagenation
  );
  const [inputPassword, setInputPassword] = useState(null);
  const [inputSearch, setInputSearch] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [searchResult, setSearchResult] = useState({});
  const [isShowingSearchResult, setIsShowingSearchResult] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    if (!isShowingSearchResult) handleGetApplicationData();
    else handleGetSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationTablePagenation]);

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
      case "codesandbox":
        window.open("https://codesandbox.io/");
        break;
      case "codepen":
        window.open("https://codepen.io/");
        break;
      case "jsfiddle":
        window.open("https://jsfiddle.net/");
        break;
      default:
        return null;
    }
  };

  const handleGetApplicationData = () => {
    (async () => {
      const response = await fetch(
        `${apiMatrix.APPLICATIONS_GET_ALL}?pagination[page]=${applicationTablePagenation.current}&pagination[pageSize]=${applicationTablePagenation.size}`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_APPLICATION_DATA, payload: response });
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
      navigate(
        `/${categoryMatrix.APPLICATIONS.toLowerCase()}/createApplications`
      );
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
      case "name":
        return "Input application name";
      case "type":
        return "Input application type";
      case "description":
        return "Input application description";
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
      case "name":
        searchUrl = `${apiMatrix.APPLICATIONS_GET_ALL}?pagination[page]=${applicationTablePagenation.current}&pagination[pageSize]=${applicationTablePagenation.size}&filters[name][$containsi]=${inputSearch}`;
        break;
      case "type":
        searchUrl = `${apiMatrix.APPLICATIONS_GET_ALL}?pagination[page]=${applicationTablePagenation.current}&pagination[pageSize]=${applicationTablePagenation.size}&filters[type][$containsi]=${inputSearch}`;
        break;
      case "description":
        searchUrl = `${apiMatrix.APPLICATIONS_GET_ALL}?pagination[page]=${applicationTablePagenation.current}&pagination[pageSize]=${applicationTablePagenation.size}&filters[description][$containsi]=${inputSearch}`;
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
      label: "Search by Name",
      value: "name",
    },
    {
      label: "Search by Type",
      value: "type",
    },
    {
      label: "Search by Description",
      value: "description",
    },
  ];

  const pageContent = (
    <Space direction="vertical" wrap align="start">
      <Space wrap className={style.lw_applications_btn_wrapper}>
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
          icon={<CodeSandboxOutlined />}
          onClick={() => handleBtnOnClick("codesandbox")}
        >
          CodeSandBox
        </Button>
        <Button
          type="default"
          icon={<CodepenOutlined />}
          onClick={() => handleBtnOnClick("codepen")}
        >
          CodePen
        </Button>
        <Button
          type="default"
          icon={<CodeOutlined />}
          onClick={() => handleBtnOnClick("jsfiddle")}
        >
          JSFiddle
        </Button>
        <Input.Search
          className={style.lw_applications_search}
          addonBefore={
            <Select
              className={style.lw_applications_search_type_selector}
              placeholder="Search by"
              options={searchOptions}
              onChange={(value) => handleSearchTypeChange(value)}
              onClear={handleClearSearchResult}
              value={searchType}
              allowClear
            />
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
      <ApplicationsTable
        data={
          JSON.stringify(searchResult) === "{}" ? applicationData : searchResult
        }
      />
    </Space>
  );

  return (
    <LwLayout content={pageContent} pageKey={categoryMatrix.APPLICATIONS} />
  );
};

export default Applications;
