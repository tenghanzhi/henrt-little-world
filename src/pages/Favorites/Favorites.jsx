import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Space } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import FavoritesList from "./FavoritesList";
import FavoritesTable from "./FavoritesTable";
import FavoritesTopBtns from "./FavoritesTopBtns";
import FavoritesFilter from "./FavoritesFilter";
import LwLayout from "../common/LwLayout";
import { SET_FAVORITE_DATA } from "../../redux/constants";
import style from "./style/Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteTablePagenation = useSelector(
    (state) => state.favoriteTablePagenation
  );
  const favoriteTableSorter = useSelector((state) => state.favoriteTableSorter);
  const favoriteTableFilter = useSelector((state) => state.favoriteTableFilter);

  useEffect(() => {
    handleGetFavoriteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteTablePagenation, favoriteTableSorter, favoriteTableFilter]);

  const handleMessage = (key, type, content) => {
    const messageDuration = 2;

    switch (type) {
      case "error": {
        message.error({
          key: key,
          content: `${messageMatrix.LOADING_MESSAGE_ERROR}${content}`,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handleGetFavoriteData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.FAVORITE_GET_ALL}?pagination[page]=${
          favoriteTablePagenation.current
        }&pagination[pageSize]=${favoriteTablePagenation.size}&sort=${
          favoriteTableSorter.sort
        }${favoriteTableSorter.order}${
          favoriteTableFilter.name
            ? `&filters[name][$containsi][0]=${favoriteTableFilter.name}`
            : ""
        }${
          favoriteTableFilter.type
            ? `&filters[type][$containsi][1]=${favoriteTableFilter.type}`
            : ""
        }`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_FAVORITE_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(messageKey, "error", error);
      });
  };

  const pageContent = (
    <Space direction="vertical" wrap align="start">
      <Space wrap className={style.lw_favorite_btn_wrapper}>
        <FavoritesTopBtns />
        <FavoritesFilter />
      </Space>
      <FavoritesTable />
      <FavoritesList />
    </Space>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.FAVORITES} />;
};

export default Favorites;
