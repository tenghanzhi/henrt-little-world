import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Popover, Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SET_FAVORITE_TABLE_COLUMNS } from "../../redux/constants";
import style from "./style/FavoriteTableColsController.module.css";

const FavoriteTableColsController = () => {
  const dispatch = useDispatch();
  const favoriteTableColumns = useSelector(
    (state) => state.favoriteTableColumns
  );

  const handleTogleChange = (type, value) => {
    switch (type) {
      case "all":
        dispatch({
          type: SET_FAVORITE_TABLE_COLUMNS,
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
          type: SET_FAVORITE_TABLE_COLUMNS,
          payload: { ...favoriteTableColumns, [type]: value },
        });
        break;
    }
  };

  const getTogleContent = (title, key) => {
    const isAllChecked =
      favoriteTableColumns.name &&
      favoriteTableColumns.type &&
      favoriteTableColumns.createdAt &&
      favoriteTableColumns.updatedAt &&
      favoriteTableColumns.description &&
      favoriteTableColumns.action;

    return (
      <ul className={style.lw_favorites_tableColsController_wrapper}>
        <Switch
          checkedChildren="Show"
          unCheckedChildren="Hide"
          className={style.lw_favorites_tableColsController_switch}
          checked={key === "all" ? isAllChecked : favoriteTableColumns[key]}
          size="medium"
          onChange={(value) => handleTogleChange(key, value)}
        />
        <div className={style.lw_favorites_tableColsController_title}>
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
        <Button className={style.lw_favorites_tableColsController_btn}>
          Columns Setup <DownOutlined />
        </Button>
      </Popover>
    </>
  );
};

export default FavoriteTableColsController;
