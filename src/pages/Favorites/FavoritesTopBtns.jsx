import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import categoryMatrix from "../common/categoryMatrix";
import style from "./style/FavoritesTopBtns.module.css";

const FavoritesTopBtns = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);

  const handleBtnOnClick = (type) => {
    switch (type.toLowerCase()) {
      case "create":
        navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/createFavorites`);
        break;
      default:
        return null;
    }
  };

  return (
    <>
      {userInfoData?.user?.username === "tenghanzhi" && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleBtnOnClick("create")}
          disabled={!userInfoData.jwt}
          className={style.lw_favorites_topBtns_btns}
        >
          Create New
        </Button>
      )}
    </>
  );
};

export default FavoritesTopBtns;
