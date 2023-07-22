import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Skeleton } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import FavoritesForm from "./FavoritesForm";
import LwLayout from "../common/LwLayout";
import handleMessage from "../utils/handleMessage";
import style from "./style/EditFavorites.module.css";

const EditFavorites = () => {
  const selectedFavoriteId = useSelector((state) => state.selectedFavoriteId);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [fetchedFavoriteData, setFetchedFavoriteData] = useState({});

  useEffect(() => {
    handleGetFavoriteDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetFavoriteDataById = () => {
    const messageKey = "editPageLoadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.FAVORITE_GET_BY_ID}/${selectedFavoriteId}`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
        }
        setFetchedFavoriteData(response.data.attributes);
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.LOADING_MESSAGE_ERROR}${error}`
        );
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  };

  const loadedPageContent = (
    <>
      <Typography.Title
        level={4}
        className={style.lw_favorite_edit_favorite_header}
      >
        Edit Favorite {fetchedFavoriteData.name}
      </Typography.Title>
      <FavoritesForm isEdit={true} data={fetchedFavoriteData} />
    </>
  );

  const loadingPageContent = <Skeleton />;

  const pageContent = isPageLoading ? loadingPageContent : loadedPageContent;

  return <LwLayout content={pageContent} />;
};

export default EditFavorites;
