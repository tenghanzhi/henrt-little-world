import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, InputNumber, Select } from "antd";
import {
  SET_LEETCOD_TABLE_FILTER,
  SET_LEETCOD_TABLE_FILTER_TYPE,
} from "../../redux/constants";
import style from "./style/LeetCodesFilter.module.css";

const LeetCodesFilter = () => {
  const dispatch = useDispatch();
  const leetcodeTableFilter = useSelector((state) => state.leetcodeTableFilter);
  const leetcodeTableFilterType = useSelector(
    (state) => state.leetcodeTableFilterType
  );

  const handleSearchPlaceholder = () => {
    switch (leetcodeTableFilterType) {
      case "title":
        return "Input problem title";
      case "index":
        return "Input problem LeetCode index";
      default:
        return "Please select a search by type to search";
    }
  };

  const handleSearchTypeChange = (value) => {
    dispatch({
      type: SET_LEETCOD_TABLE_FILTER,
      payload: {
        difficulty: null,
        type: null,
        leetcodeIndex: null,
        title: null,
      },
    });
    dispatch({
      type: SET_LEETCOD_TABLE_FILTER_TYPE,
      payload: value,
    });
  };

  const handleSearchValueChange = (e) => {
    switch (leetcodeTableFilterType) {
      case "index":
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
    dispatch({
      type: SET_LEETCOD_TABLE_FILTER,
      payload: {
        difficulty: null,
        type: null,
        leetcodeIndex: null,
        title: null,
      },
    });
    dispatch({
      type: SET_LEETCOD_TABLE_FILTER_TYPE,
      payload: null,
    });
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

  return (
    <>
      <Select
        className={style.lw_leetcode_search_type_selector}
        placeholder="Search by"
        options={searchOptions}
        onChange={(value) => handleSearchTypeChange(value)}
        onClear={handleClearSearchResult}
        value={leetcodeTableFilterType}
        allowClear
      />
      {leetcodeTableFilterType === "index" && (
        <InputNumber
          className={style.lw_leetcode_search}
          placeholder={handleSearchPlaceholder()}
          onChange={(e) => handleSearchValueChange(e)}
          disabled={!leetcodeTableFilterType}
          value={leetcodeTableFilter?.leetcodeIndex}
          min={0}
          max={9999}
          allowClear
        />
      )}
      {leetcodeTableFilterType === "title" && (
        <Input
          className={style.lw_leetcode_search}
          placeholder={handleSearchPlaceholder()}
          onChange={(e) => handleSearchValueChange(e)}
          disabled={!leetcodeTableFilterType}
          value={leetcodeTableFilter?.title}
          allowClear
        />
      )}
      {leetcodeTableFilterType && (
        <Button
          danger
          onClick={handleClearSearchResult}
          disabled={
            (leetcodeTableFilterType === "index" &&
              !leetcodeTableFilter?.leetcodeIndex) ||
            (leetcodeTableFilterType === "title" && !leetcodeTableFilter?.title)
          }
        >
          Clear Results
        </Button>
      )}
    </>
  );
};

export default LeetCodesFilter;
