import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Popover, Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SET_APPLICATION_TABLE_COLUMNS } from "../../redux/constants";
import style from "./style/ApplicationsTableColsController.module.css";

const ApplicationsTableColsController = () => {
  const dispatch = useDispatch();
  const applicationTableColumns = useSelector(
    (state) => state.applicationTableColumns
  );

  const handleTogleChange = (type, value) => {
    switch (type) {
      case "name":
        dispatch({
          type: SET_APPLICATION_TABLE_COLUMNS,
          payload: { ...applicationTableColumns, name: value },
        });
        break;
      case "type":
        dispatch({
          type: SET_APPLICATION_TABLE_COLUMNS,
          payload: { ...applicationTableColumns, type: value },
        });
        break;
      case "createdAt":
        dispatch({
          type: SET_APPLICATION_TABLE_COLUMNS,
          payload: { ...applicationTableColumns, createdAt: value },
        });
        break;
      case "updatedAt":
        dispatch({
          type: SET_APPLICATION_TABLE_COLUMNS,
          payload: { ...applicationTableColumns, updatedAt: value },
        });
        break;
      case "description":
        dispatch({
          type: SET_APPLICATION_TABLE_COLUMNS,
          payload: { ...applicationTableColumns, description: value },
        });
        break;
      case "action":
        dispatch({
          type: SET_APPLICATION_TABLE_COLUMNS,
          payload: { ...applicationTableColumns, action: value },
        });
        break;
      case "all":
        dispatch({
          type: SET_APPLICATION_TABLE_COLUMNS,
          payload: {
            name: value,
            type: value,
            createdAt: value,
            updatedAt: value,
            description: value,
            action: value,
          },
        });
        break;
      default:
        break;
    }
  };

  const isAllChecked =
    applicationTableColumns.name &&
    applicationTableColumns.type &&
    applicationTableColumns.createdAt &&
    applicationTableColumns.updatedAt &&
    applicationTableColumns.description &&
    applicationTableColumns.action;

  const content = (
    <div>
      <ul className={style.lw_applications_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_applications_tableColsController_switch}
          checked={isAllChecked}
          size="medium"
          onChange={(value) => handleTogleChange("all", value)}
        />
        <div className={style.lw_applications_tableColsController_title}>
          All
        </div>
      </ul>
      <ul className={style.lw_applications_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_applications_tableColsController_switch}
          checked={applicationTableColumns.name}
          size="medium"
          onChange={(value) => handleTogleChange("name", value)}
        />
        <div className={style.lw_applications_tableColsController_title}>
          Title
        </div>
      </ul>
      <ul className={style.lw_applications_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_applications_tableColsController_switch}
          checked={applicationTableColumns.type}
          size="medium"
          onChange={(value) => handleTogleChange("type", value)}
        />
        <div className={style.lw_applications_tableColsController_title}>
          Type
        </div>
      </ul>
      <ul className={style.lw_applications_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_applications_tableColsController_switch}
          checked={applicationTableColumns.createdAt}
          size="medium"
          onChange={(value) => handleTogleChange("createdAt", value)}
        />
        <div className={style.lw_applications_tableColsController_title}>
          Created At
        </div>
      </ul>
      <ul className={style.lw_applications_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_applications_tableColsController_switch}
          checked={applicationTableColumns.updatedAt}
          size="medium"
          onChange={(value) => handleTogleChange("updatedAt", value)}
        />
        <div className={style.lw_applications_tableColsController_title}>
          Updated At
        </div>
      </ul>
      <ul className={style.lw_applications_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_applications_tableColsController_switch}
          checked={applicationTableColumns.description}
          size="medium"
          onChange={(value) => handleTogleChange("description", value)}
        />
        <div className={style.lw_applications_tableColsController_title}>
          Description
        </div>
      </ul>
      <ul className={style.lw_applications_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_applications_tableColsController_switch}
          checked={applicationTableColumns.action}
          size="medium"
          onChange={(value) => handleTogleChange("action", value)}
        />
        <div className={style.lw_applications_tableColsController_title}>
          Action
        </div>
      </ul>
    </div>
  );

  return (
    <>
      <Popover content={content} trigger="click">
        <Button className={style.lw_applications_tableColsController_btn}>
          Columns Setup <DownOutlined />
        </Button>
      </Popover>
    </>
  );
};

export default ApplicationsTableColsController;
