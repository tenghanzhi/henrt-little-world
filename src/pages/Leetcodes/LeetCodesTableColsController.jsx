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
      case "index":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, index: value },
        });
        break;
      case "title":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, title: value },
        });
        break;
      case "createdAt":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, createdAt: value },
        });
        break;
      case "updatedAt":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, updatedAt: value },
        });
        break;
      case "firstCompletedDate":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, firstCompletedDate: value },
        });
        break;
      case "difficulty":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, difficulty: value },
        });
        break;
      case "type":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, type: value },
        });
        break;
      case "action":
        dispatch({
          type: SET_LEETCODE_TABLE_COLUMNS,
          payload: { ...leetcodeTableColumns, action: value },
        });
        break;

      default:
        break;
    }
  };

  const content = (
    <div>
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={leetcodeTableColumns.index}
          size="medium"
          onChange={(value) => handleTogleChange("index", value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>
          Index
        </div>
      </ul>
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={leetcodeTableColumns.title}
          size="medium"
          onChange={(value) => handleTogleChange("title", value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>
          Title
        </div>
      </ul>
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={leetcodeTableColumns.createdAt}
          size="medium"
          onChange={(value) => handleTogleChange("createdAt", value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>
          Created At
        </div>
      </ul>
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={leetcodeTableColumns.updatedAt}
          size="medium"
          onChange={(value) => handleTogleChange("updatedAt", value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>
          Updated At
        </div>
      </ul>
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={leetcodeTableColumns.firstCompletedDate}
          size="medium"
          onChange={(value) => handleTogleChange("firstCompletedDate", value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>
          Completed Date
        </div>
      </ul>
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={leetcodeTableColumns.difficulty}
          size="medium"
          onChange={(value) => handleTogleChange("difficulty", value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>
          Difficulty
        </div>
      </ul>
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={leetcodeTableColumns.type}
          size="medium"
          onChange={(value) => handleTogleChange("type", value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>Type</div>
      </ul>
      <ul className={style.lw_leetcodes_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_leetcodes_tableColsController_switch}
          checked={leetcodeTableColumns.action}
          size="medium"
          onChange={(value) => handleTogleChange("action", value)}
        />
        <div className={style.lw_leetcodes_tableColsController_title}>
          Action
        </div>
      </ul>
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