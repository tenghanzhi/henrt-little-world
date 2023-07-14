import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Select } from "antd";
import {
  SET_COMPONENT_TABLE_FILTER,
  SET_COMPONENT_TABLE_FILTER_TYPE,
} from "../../redux/constants";
import style from "./style/ComponentsFilter.module.css";

const ComponentsFilter = () => {
  const dispatch = useDispatch();
  const componentTableFilter = useSelector(
    (state) => state.componentTableFilter
  );
  const componentTableFilterType = useSelector(
    (state) => state.componentTableFilterType
  );

  const handleSearchPlaceholder = () => {
    switch (componentTableFilterType) {
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
    dispatch({
      type: SET_COMPONENT_TABLE_FILTER,
      payload: {
        name: null,
        componentType: null,
        codeType: null,
      },
    });
    dispatch({
      type: SET_COMPONENT_TABLE_FILTER_TYPE,
      payload: value,
    });
  };

  const handleSearchValueChange = (e) => {
    switch (componentTableFilterType) {
      case "name":
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
    dispatch({
      type: SET_COMPONENT_TABLE_FILTER,
      payload: {
        name: null,
        componentType: null,
        codeType: null,
      },
    });
    dispatch({
      type: SET_COMPONENT_TABLE_FILTER_TYPE,
      payload: null,
    });
  };

  const searchOptions = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Component Type",
      value: "componentType",
    },
    {
      label: "Code Type",
      value: "codeType",
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

  return (
    <>
      <Select
        className={style.lw_components_search_type_selector}
        placeholder="Search by"
        options={searchOptions}
        onChange={(value) => handleSearchTypeChange(value)}
        onClear={handleClearSearchResult}
        value={componentTableFilterType}
        allowClear
      />
      {componentTableFilterType === "name" && (
        <Input
          className={style.lw_components_search}
          placeholder={handleSearchPlaceholder()}
          onChange={(e) => handleSearchValueChange(e)}
          value={componentTableFilter.name}
          disabled={!componentTableFilterType}
          enterButton
          allowClear
        />
      )}
      {componentTableFilterType === "componentType" && (
        <Select
          className={style.lw_components_search}
          placeholder={handleSearchPlaceholder()}
          onChange={(e) => handleSearchValueChange(e)}
          value={componentTableFilter.componentType}
          disabled={!componentTableFilterType}
          options={componentTypeOptions}
          enterButton
          allowClear
        />
      )}
      {componentTableFilterType === "codeType" && (
        <Select
          className={style.lw_components_search}
          placeholder={handleSearchPlaceholder()}
          onChange={(e) => handleSearchValueChange(e)}
          value={componentTableFilter.codeType}
          disabled={!componentTableFilterType}
          options={codeTypeOptions}
          enterButton
          allowClear
        />
      )}
      {componentTableFilterType && (
        <Button
          danger
          onClick={handleClearSearchResult}
          disabled={
            (componentTableFilterType === "name" &&
              !componentTableFilter?.name) ||
            (componentTableFilterType === "componentType" &&
              !componentTableFilter?.componentType) ||
            (componentTableFilterType === "codeType" &&
              !componentTableFilter?.codeType)
          }
        >
          Clear Results
        </Button>
      )}
    </>
  );
};

export default ComponentsFilter;
