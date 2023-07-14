import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";
import { SET_COMPONENT_TABLE_SORTER } from "../../redux/constants";
import style from "./style/ComponentsSorter.module.css";

const ComponentsSorter = () => {
  const dispatch = useDispatch();
  const componentTableSorter = useSelector(
    (state) => state.componentTableSorter
  );

  const handleSortTypeChange = (value) => {
    switch (value) {
      case "createdAt":
        dispatch({
          type: SET_COMPONENT_TABLE_SORTER,
          payload: { sort: value, order: ":desc" },
        });
        break;
      case "updatedAt":
        dispatch({
          type: SET_COMPONENT_TABLE_SORTER,
          payload: { sort: value, order: ":desc" },
        });
        break;
      default:
        dispatch({
          type: SET_COMPONENT_TABLE_SORTER,
          payload: { sort: value, order: ":asc" },
        });
        break;
    }
  };

  const handleSortOrderChange = (value) => {
    dispatch({
      type: SET_COMPONENT_TABLE_SORTER,
      payload: { sort: componentTableSorter.sort, order: value },
    });
  };

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

  return (
    <>
      <div className={style.lw_components_sortor_title}>Sort Type:</div>
      <Select
        className={style.lw_components_search_type_selector}
        placeholder="Sort Type"
        options={sorterTypeOptions}
        onChange={(value) => handleSortTypeChange(value)}
        value={componentTableSorter.sort}
      />
      <div className={style.lw_components_sortor_title}>Sort Order:</div>
      <Select
        className={style.lw_components_search_type_selector}
        placeholder="Sort Order"
        options={sorterOrderOptions}
        onChange={(value) => handleSortOrderChange(value)}
        value={componentTableSorter.order}
      />
    </>
  );
};

export default ComponentsSorter;
