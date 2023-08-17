import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Popover, Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SET_LEETCODE_TABLE_COLUMNS } from "../../redux/constants";
import style from "./style/LeetCodesTableColsController.module.css";

const LeetCodesTableColsController = () => {
  const dispatch = useDispatch();
  const leetcodeTableColumns = useSelector(
    (state) => state.leetcodeTableColumns
  );

  const handleTogleChange = (type, value) => {
    switch (type) {
      case "all":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: {
            index: value,
            title: value,
            createdAt: value,
            updatedAt: value,
            firstCompletedDate: value,
            difficulty: value,
            type: value,
            action: value,
          },
        });
        break;
      default:
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, [type]: value },
        });
        break;
    }
  };

  const getTogleContent = (title, key) => {
    const isAllChecked =
      leetcodeTableColumns.index &&
      leetcodeTableColumns.title &&
      leetcodeTableColumns.createdAt &&
      leetcodeTableColumns.updatedAt &&
      leetcodeTableColumns.firstCompletedDate &&
      leetcodeTableColumns.difficulty &&
      leetcodeTableColumns.type &&
      leetcodeTableColumns.action;

    return (
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={key === "all" ? isAllChecked : leetcodeTableColumns[key]}
          size="medium"
          onChange={(value) => handleTogleChange(key, value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>
          {title}
        </div>
      </ul>
    );
  };

  const content = (
    <div>
      {getTogleContent("All", "all")}
      {getTogleContent("Index", "index")}
      {getTogleContent("Title", "title")}
      {getTogleContent("Created At", "createdAt")}
      {getTogleContent("Updated At", "updatedAt")}
      {getTogleContent("Completed Date", "firstCompletedDate")}
      {getTogleContent("Difficulty", "difficulty")}
      {getTogleContent("Type", "type")}
      {getTogleContent("Action", "action")}
    </div>
  );

  return (
    <>
      <Popover content={content} trigger="click">
        <Button className={style.lw_leetcodes_tableColsController_btn}>
          Columns Setup <DownOutlined />
        </Button>
      </Popover>
    </>
  );
};

export default LeetCodesTableColsController;
