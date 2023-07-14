import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Select } from "antd";
import {
  SET_APPLICATION_TABLE_FILTER,
  SET_APPLICATION_TABLE_FILTER_TYPE,
} from "../../redux/constants";
import style from "./style/ApplicationsFilter.module.css";

const ApplicationsFilter = () => {
  const dispatch = useDispatch();
  const applicationTableFilter = useSelector(
    (state) => state.applicationTableFilter
  );
  const applicationTableFilterType = useSelector(
    (state) => state.applicationTableFilterType
  );

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

  return (
    <>
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
    </>
  );
};

export default ApplicationsFilter;
