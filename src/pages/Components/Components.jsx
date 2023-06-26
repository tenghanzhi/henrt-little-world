import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  message,
  Space,
  Button,
  Input,
  Select,
  Pagination,
  Tooltip,
} from "antd";
import { PlusOutlined, Html5Outlined } from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import ComponentsCard from "./ComponentsCard";
import LwLayout from "../common/LwLayout";
import {
  SET_COMPONENT_DATA,
  SET_COMPONENT_TABLE_SORTER,
  SET_COMPONENT_TABLE_FILTER,
  SET_COMPONENT_TABLE_PAGENATION,
} from "../../redux/constants";
import style from "./style/Components.module.css";

const Components = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);
  const componentData = useSelector((state) => state.componentData);
  const componentTablePagenation = useSelector(
    (state) => state.componentTablePagenation
  );
  const componentTableSorter = useSelector(
    (state) => state.componentTableSorter
  );
  const componentTableFilter = useSelector(
    (state) => state.componentTableFilter
  );
  const [inputSearch, setInputSearch] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [sorterType, setSorterType] = useState("Name");
  const [sorterOrder, setSorterOrder] = useState("Ascent");

  useEffect(() => {
    handleClearSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetComponentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentTablePagenation, componentTableSorter, componentTableFilter]);

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
      case "uiverse":
        window.open("https://uiverse.io/");
        break;
      case "angrytools":
        window.open("https://angrytools.com/");
        break;
      case "animista":
        window.open("https://animista.net/");
        break;
      case "flatuicolors":
        window.open("https://flatuicolors.com/");
        break;
      case "create":
        navigate(
          `/${categoryMatrix.COMPONENTS.toLowerCase()}/createComponents`
        );
        break;
      default:
        return null;
    }
  };

  const handleGetComponentData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.COMPONENTS_GET_ALL}?pagination[page]=${
          componentTablePagenation.current
        }&pagination[pageSize]=${componentTablePagenation.size}&sort=${
          componentTableSorter.sort
        }${componentTableSorter.order}${
          componentTableFilter.name
            ? `&filters[name][$containsi][0]=${componentTableFilter.name}`
            : ""
        }${
          componentTableFilter.componentType
            ? `&filters[componentType][$containsi][1]=${componentTableFilter.componentType}`
            : ""
        }${
          componentTableFilter.codeType
            ? `&filters[codeType][$containsi][2]=${componentTableFilter.codeType}`
            : ""
        }`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_COMPONENT_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(messageKey, "error", error);
      });
  };

  const handleSearchPlaceholder = () => {
    switch (searchType) {
      case "name":
        return "Input component name";
      case "componentType":
        return "Input component type";
      case "codeType":
        return "Input component code type";
      default:
        return "Please select a search by type to search";
    }
  };

  const handleSearchTypeChange = (value) => {
    setInputSearch(null);
    dispatch({
      type: SET_COMPONENT_TABLE_FILTER,
      payload: {
        name: null,
        componentType: null,
        codeType: null,
      },
    });
    setSearchType(value);
  };

  const handleSearchValueChange = (e) => {
    switch (searchType) {
      case "name":
        setInputSearch(e.target.value);
        dispatch({
          type: SET_COMPONENT_TABLE_FILTER,
          payload: {
            name: e.target.value,
            componentType: componentTableFilter.componentType,
            codeType: componentTableFilter.codeType,
          },
        });
        break;
      case "componentType":
        setInputSearch(e);
        dispatch({
          type: SET_COMPONENT_TABLE_FILTER,
          payload: {
            name: componentTableFilter.name,
            componentType: e,
            codeType: componentTableFilter.codeType,
          },
        });
        break;
      case "codeType":
        setInputSearch(e);
        dispatch({
          type: SET_COMPONENT_TABLE_FILTER,
          payload: {
            name: componentTableFilter.name,
            componentType: componentTableFilter.tcomponentTypeype,
            codeType: e,
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
      type: SET_COMPONENT_TABLE_FILTER,
      payload: {
        name: null,
        componentType: null,
        codeType: null,
      },
    });
    setSearchType(null);
  };

  const handleSortTypeChange = (value) => {
    setSorterType(value);
    dispatch({
      type: SET_COMPONENT_TABLE_SORTER,
      payload: { sort: value, order: componentTableSorter.order },
    });
  };

  const handleSortOrderChange = (value) => {
    setSorterOrder(value);
    dispatch({
      type: SET_COMPONENT_TABLE_SORTER,
      payload: { sort: componentTableSorter.sort, order: value },
    });
  };

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_COMPONENT_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  const searchOptions = [
    {
      label: "Search by Name",
      value: "name",
    },
    {
      label: "Search by Component Type",
      value: "componentType",
    },
    {
      label: "Search by Code Type",
      value: "codeType",
    },
  ];

  const sorterTypeOptions = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Created Date",
      value: "createdAt",
    },
    {
      label: "Updated Date",
      value: "updatedAt",
    },
  ];

  const sorterOrderOptions = [
    {
      label: "Ascent",
      value: ":asc",
    },
    {
      label: "Descent",
      value: ":desc",
    },
  ];

  const codeTypeOptions = [
    {
      label: "Vanilla",
      value: "Vanilla",
    },
    {
      label: "React",
      value: "React",
    },
  ];

  const componentTypeOptions = [
    {
      label: "Creativity",
      value: "Creativity",
    },
    {
      label: "Buttons",
      value: "Buttons",
    },
    {
      label: "Checkboxes",
      value: "Checkboxes",
    },
    {
      label: "Toggle Switches",
      value: "Toggle Switches",
    },
    {
      label: "Cards",
      value: "Cards",
    },
    {
      label: "Loaders",
      value: "Loaders",
    },
    {
      label: "Inputs",
      value: "Inputs",
    },
    {
      label: "Radio Buttons",
      value: "Radio Buttons",
    },
    {
      label: "Forms",
      value: "Forms",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  const pageContent = (
    <Space direction="vertical" wrap align="start">
      <Space className={style.lw_components_btn_wrapper} wrap>
        <Space wrap>
          <Tooltip
            title={
              !userInfoData.jwt
                ? "Please login with admin account to create"
                : ""
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
            icon={<Html5Outlined />}
            onClick={() => handleBtnOnClick("uiverse")}
          >
            Open-Source UI
          </Button>
          <Button
            type="default"
            icon={<Html5Outlined />}
            onClick={() => handleBtnOnClick("angrytools")}
          >
            Angry Tools
          </Button>
          <Button
            type="default"
            icon={<Html5Outlined />}
            onClick={() => handleBtnOnClick("animista")}
          >
            Animista
          </Button>
          <Button
            type="default"
            icon={<Html5Outlined />}
            onClick={() => handleBtnOnClick("flatuicolors")}
          >
            Flat UI Colors
          </Button>
        </Space>
        <Space wrap>
          <div className={style.lw_components_sortor_title}>Sort Type:</div>
          <Select
            className={style.lw_components_search_type_selector}
            placeholder="Sort Type"
            options={sorterTypeOptions}
            onChange={(value) => handleSortTypeChange(value)}
            onClear={handleClearSearchResult}
            value={sorterType}
            allowClear
          />
          <div className={style.lw_components_sortor_title}>Sort Order:</div>
          <Select
            className={style.lw_components_search_type_selector}
            placeholder="Sort Order"
            options={sorterOrderOptions}
            onChange={(value) => handleSortOrderChange(value)}
            onClear={handleClearSearchResult}
            value={sorterOrder}
            allowClear
          />
          <Select
            className={style.lw_components_search_type_selector}
            placeholder="Search by"
            options={searchOptions}
            onChange={(value) => handleSearchTypeChange(value)}
            onClear={handleClearSearchResult}
            value={searchType}
            allowClear
          />
          {searchType === "name" && (
            <Input
              className={style.lw_components_search}
              placeholder={handleSearchPlaceholder()}
              onChange={(e) => handleSearchValueChange(e)}
              value={inputSearch}
              disabled={!searchType}
              enterButton
              allowClear
            />
          )}
          {searchType === "componentType" && (
            <Select
              className={style.lw_components_search}
              placeholder={handleSearchPlaceholder()}
              onChange={(e) => handleSearchValueChange(e)}
              value={inputSearch}
              disabled={!searchType}
              options={componentTypeOptions}
              enterButton
              allowClear
            />
          )}
          {searchType === "codeType" && (
            <Select
              className={style.lw_components_search}
              placeholder={handleSearchPlaceholder()}
              onChange={(e) => handleSearchValueChange(e)}
              value={inputSearch}
              disabled={!searchType}
              options={codeTypeOptions}
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
      </Space>
      <Space direction="horizontal" wrap align="center">
        {componentData?.data?.map((data) => (
          <ComponentsCard data={data} />
        ))}
      </Space>
      <Space className={style.lw_components_pagination_wrapper} wrap>
        <Pagination
          showSizeChanger={true}
          showQuickJumper={true}
          hideOnSinglePage={true}
          defaultPageSize={
            componentTablePagenation?.size ? componentTablePagenation.size : 20
          }
          defaultCurrent={
            componentTablePagenation?.current
              ? componentTablePagenation.current
              : 1
          }
          total={componentData.meta?.pagination?.total}
          onChange={(current, size) => handlePaginationChange(current, size)}
          className={style.lw_components_table_pagination}
        />
      </Space>
    </Space>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.COMPONENTS} />;
};

export default Components;
