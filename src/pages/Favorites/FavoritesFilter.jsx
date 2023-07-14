import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "antd";
import { SET_FAVORITE_TABLE_FILTER } from "../../redux/constants";
import style from "./style/FavoritesFilter.module.css";

const FavoritesFilter = () => {
  const dispatch = useDispatch();
  const favoriteTableFilter = useSelector((state) => state.favoriteTableFilter);

  const handleSearchValueChange = (e) => {
    dispatch({
      type: SET_FAVORITE_TABLE_FILTER,
      payload: {
        name: e.target.value,
        type: favoriteTableFilter.type,
      },
    });
  };

  const handleClearSearchResult = () => {
    dispatch({
      type: SET_FAVORITE_TABLE_FILTER,
      payload: {
        name: null,
        type: null,
      },
    });
  };

  return (
    <>
      <Input
        className={style.lw_favorite_search}
        placeholder="Input Favorite Name to search"
        onChange={(e) => handleSearchValueChange(e)}
        value={favoriteTableFilter.name}
        allowClear
      />
      <Button
        danger
        onClick={handleClearSearchResult}
        disabled={!favoriteTableFilter.name}
      >
        Clear Results
      </Button>
    </>
  );
};

export default FavoritesFilter;
