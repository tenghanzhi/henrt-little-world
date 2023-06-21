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
import {
  SET_APPLICATION_DATA,
  SET_APPLICATION_TABLE_FILTER,
} from "../../redux/constants";
import style from "./style/Applications.module.css";

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applicationData = useSelector((state) => state.applicationData);
  const applicationTablePagenation = useSelector(
    (state) => state.applicationTablePagenation
  );
  const applicationTableSorter = useSelector(
    (state) => state.applicationTableSorter
  );
  const applicationTableFilter = useSelector(
    (state) => state.applicationTableFilter
  );
  const [inputPassword, setInputPassword] = useState(null);
  const [inputSearch, setInputSearch] = useState(null);
  const [searchType, setSearchType] = useState(null);

  useEffect(() => {
    handleClearSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetApplicationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    applicationTablePagenation,
    applicationTableSorter,
    applicationTableFilter,
  ]);

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
        `${apiMatrix.APPLICATIONS_GET_ALL}?pagination[page]=${
          applicationTablePagenation.current
        }&pagination[pageSize]=${applicationTablePagenation.size}&sort=${
          applicationTableSorter.sort
        }${applicationTableSorter.order}${
          applicationTableFilter.name
            ? `&filters[name][$containsi][0]=${applicationTableFilter.name}`
            : ""
        }${
          applicationTableFilter.description
            ? `&filters[description][$containsi][2]=${applicationTableFilter.description}`
            : ""
        }`
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
      case "description":
        return "Input application description";
      default:
        return "Please select a search by type to search";
    }
  };

  const handleSearchTypeChange = (value) => {
    setInputSearch(null);
    dispatch({
      type: SET_APPLICATION_TABLE_FILTER,
      payload: {
        name: null,
        type: null,
        description: null,
      },
    });
    setSearchType(value);
  };

  const handleSearchValueChange = (e) => {
    setInputSearch(e.target.value);
    switch (searchType) {
      case "name":
        dispatch({
          type: SET_APPLICATION_TABLE_FILTER,
          payload: {
            name: e.target.value,
            type: applicationTableFilter.type,
            description: applicationTableFilter.description,
          },
        });
        break;
      case "description":
        dispatch({
          type: SET_APPLICATION_TABLE_FILTER,
          payload: {
            name: applicationTableFilter.name,
            type: applicationTableFilter.type,
            description: e.target.value,
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
      type: SET_APPLICATION_TABLE_FILTER,
      payload: {
        name: null,
        type: null,
        description: null,
      },
    });
    setSearchType(null);
  };

  const searchOptions = [
    {
      label: "Search by Name",
      value: "name",
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
        <Select
          className={style.lw_applications_search_type_selector}
          placeholder="Search by"
          options={searchOptions}
          onChange={(value) => handleSearchTypeChange(value)}
          onClear={handleClearSearchResult}
          value={searchType}
          allowClear
        />
        {searchType && (
          <Input
            className={style.lw_applications_search}
            placeholder={handleSearchPlaceholder()}
            onChange={(e) => handleSearchValueChange(e)}
            value={inputSearch}
            disabled={!searchType}
            enterButton
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
      <ApplicationsTable data={applicationData} />
    </Space>
  );

  return (
    <LwLayout content={pageContent} pageKey={categoryMatrix.APPLICATIONS} />
  );
};

export default Applications;
