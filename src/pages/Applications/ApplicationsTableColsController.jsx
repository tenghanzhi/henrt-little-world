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
        dispatch({
          type: SET_APPLICATION_TABLE_COLUMNS,
          payload: { ...applicationTableColumns, [type]: value },
        });
        break;
    }
  };

  const getTogleContent = (title, key) => {
    const isAllChecked =
      applicationTableColumns.name &&
      applicationTableColumns.type &&
      applicationTableColumns.createdAt &&
      applicationTableColumns.updatedAt &&
      applicationTableColumns.description &&
      applicationTableColumns.action;

    return (
      <ul className={style.lw_applications_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_applications_tableColsController_switch}
          checked={key === "all" ? isAllChecked : applicationTableColumns[key]}
          size="medium"
          onChange={(value) => handleTogleChange(key, value)}
        />
        <div className={style.lw_applications_tableColsController_title}>
          {title}
        </div>
      </ul>
    );
  };

  const content = (
    <div>
      {getTogleContent("All", "all")}
      {getTogleContent("Title", "name")}
      {getTogleContent("Type", "type")}
      {getTogleContent("Created At", "createdAt")}
      {getTogleContent("Updated At", "updatedAt")}
      {getTogleContent("Description", "description")}
      {getTogleContent("Action", "action")}
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
