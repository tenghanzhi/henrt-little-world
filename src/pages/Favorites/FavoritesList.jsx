import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, List } from "antd";
import { EditOutlined, LinkOutlined, EyeOutlined } from "@ant-design/icons";
import categoryMatrix from "../common/categoryMatrix";
import {
  SET_SELECTED_FAVORITE_ID,
  SET_FAVORITE_TABLE_PAGENATION,
} from "../../redux/constants";
import style from "./style/FavoritesList.module.css";

const FavoritesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfoData);
  const favoriteData = useSelector((state) => state.favoriteData);
  const favoriteTablePagenation = useSelector(
    (state) => state.favoriteTablePagenation
  );
  const favoriteTableFilter = useSelector((state) => state.favoriteTableFilter);

  const handleActionBtnOnClick = (type, item) => {
    switch (type.toLowerCase()) {
      case "check":
        window.open(item.attributes.link);
        break;
      case "review":
        dispatch({ type: SET_SELECTED_FAVORITE_ID, payload: item.id });
        navigate(`/${categoryMatrix.FAVORITES.toLowerCase()}/reviewFavorites`);
        break;
      case "edit":
        dispatch({ type: SET_SELECTED_FAVORITE_ID, payload: item.id });
        navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/editFavorites`);
        break;
      default:
        return null;
    }
  };

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_FAVORITE_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  return (
    <List
      className={style.lw_favorite_list_wrapper}
      itemLayout="vertical"
      size="medium"
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: favoriteTablePagenation?.size
          ? favoriteTablePagenation.size
          : 25,
        defaultCurrent: favoriteTablePagenation?.current
          ? favoriteTablePagenation.current
          : 1,
        total: favoriteData?.meta?.pagination?.total
          ? favoriteData?.meta?.pagination?.total
          : 0,
        onChange: (current, size) => handlePaginationChange(current, size),
      }}
      dataSource={favoriteData?.data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <Button
              type="text"
              size="small"
              icon={<LinkOutlined />}
              onClick={() => handleActionBtnOnClick("check", item)}
            >
              Source
            </Button>,
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleActionBtnOnClick("review", item)}
            >
              Review
            </Button>,
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleActionBtnOnClick("edit", item)}
              disabled={!userInfoData.jwt}
            >
              Edit
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={
              // eslint-disable-next-line
              <a onClick={() => handleActionBtnOnClick("review", item)}>
                {item.attributes.name}
              </a>
            }
            description={`${item.attributes.type} | ${
              item.attributes.description
                ? `${item.attributes.description.slice(0, 100)}...`
                : "No Description"
            }`}
          />
        </List.Item>
      )}
      loading={!favoriteTableFilter.name && favoriteData?.data?.length === 0}
    />
  );
};

export default FavoritesList;
