import React from "react";
import { Typography } from "antd";
import FavoritesForm from "./FavoritesForm";
import LwLayout from "../common/LwLayout";
import style from "./style/CreateFavorites.module.css";

const CreateFavorites = () => {
  const pageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_favorite_create_favorite_header}
      >
        Create New Favorite
      </Typography.Title>
      <FavoritesForm />
    </>
  );
  return <LwLayout content={pageContent} />;
};

export default CreateFavorites;
