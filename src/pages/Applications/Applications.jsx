import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Space, Button, Input, Select, Tooltip } from "antd";
import {
  PlusOutlined,
  CodeOutlined,
  CodeSandboxOutlined,
  CodepenOutlined,
} from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import ApplicationsTable from "./ApplicationsTable";
import ApplicationsList from "./ApplicationsList";
import LwLayout from "../common/LwLayout";
import {
  SET_APPLICATION_DATA,
  SET_APPLICATION_TABLE_FILTER,
  SET_APPLICATION_TABLE_FILTER_TYPE,
} from "../../redux/constants";
import style from "./style/Applications.module.css";

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);
  const applicationTablePagenation = useSelector(
    (state) => state.applicationTablePagenation
  );
  const applicationTableSorter = useSelector(
    (state) => state.applicationTableSorter
  );
  const applicationTableFilter = useSelector(
    (state) => state.applicationTableFilter
  );
  const applicationTableFilterType = useSelector(
    (state) => state.applicationTableFilterType
  );

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
      case "create":
        navigate(
          `/${categoryMatrix.APPLICATIONS.toLowerCase()}/createApplications`
        );
        break;
      default:
        return null;
    }
  };

  const handleGetApplicationData = () => {
    const messageKey = "loadingMessage";

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
          applicationTableFilter.type
            ? `&filters[type][$eqi][1]=${applicationTableFilter.type}`
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
        handleMessage(messageKey, "error", error);
      });
  };

  const handleSearchPlaceholder = () => {
    switch (applicationTableFilterType) {
      case "name":
        return "Input application name";
      case "description":
        return "Input application description";
      default:
        return "Please select a search by type to search";
    }
  };

  const handleSearchTypeChange = (value) => {
    dispatch({
      type: SET_APPLICATION_TABLE_FILTER,
      payload: {
        name: null,
        type: null,
        description: null,
      },
    });
    dispatch({
      type: SET_APPLICATION_TABLE_FILTER_TYPE,
      payload: value,
    });
  };

  const handleSearchValueChange = (e) => {
    switch (applicationTableFilterType) {
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
    dispatch({
      type: SET_APPLICATION_TABLE_FILTER,
      payload: {
        name: null,
        type: null,
        description: null,
      },
    });
    dispatch({
      type: SET_APPLICATION_TABLE_FILTER_TYPE,
      payload: null,
    });
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
          value={applicationTableFilterType}
          allowClear
        />
        {applicationTableFilterType && (
          <Input
            className={style.lw_applications_search}
            placeholder={handleSearchPlaceholder()}
            onChange={(e) => handleSearchValueChange(e)}
            value={
              applicationTableFilterType === "name"
                ? applicationTableFilter?.name
                : applicationTableFilter?.description
            }
            disabled={!applicationTableFilterType}
            enterButton
            allowClear
          />
        )}
        {applicationTableFilterType && (
          <Button
            danger
            onClick={handleClearSearchResult}
            disabled={
              (applicationTableFilterType === "name" &&
                !applicationTableFilter?.name) ||
              (applicationTableFilterType === "description" &&
                !applicationTableFilter?.description)
            }
          >
            Clear Results
          </Button>
        )}
      </Space>
      <ApplicationsTable />
      <ApplicationsList />
    </Space>
  );

  return (
    <LwLayout content={pageContent} pageKey={categoryMatrix.APPLICATIONS} />
  );
};

export default Applications;
