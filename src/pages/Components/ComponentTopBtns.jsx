import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined, Html5Outlined } from "@ant-design/icons";
import categoryMatrix from "../common/categoryMatrix";
import style from "./style/ComponentTopBtns.module.css";

const ComponentTopBtns = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);

  const handleBtnOnClick = (type) => {
    switch (type.toLowerCase()) {
      case "uiverse":
        window.open("https://uiverse.io/", "_blank", "noopener, noreferrer");
        break;
      case "angrytools":
        window.open(
          "https://angrytools.com/",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "animista":
        window.open("https://animista.net/", "_blank", "noopener, noreferrer");
        break;
      case "flatuicolors":
        window.open(
          "https://flatuicolors.com/",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "create":
        navigate(
          `/${categoryMatrix.COMPONENTS.toLowerCase()}/createComponents`
        );
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
          className={style.lw_component_topBtns_btns}
        >
          Create New
        </Button>
      )}
      <Button
        type="default"
        icon={<Html5Outlined />}
        onClick={() => handleBtnOnClick("uiverse")}
        className={style.lw_component_topBtns_btns}
      >
        Open-Source UI
      </Button>
      <Button
        type="default"
        icon={<Html5Outlined />}
        onClick={() => handleBtnOnClick("angrytools")}
        className={style.lw_component_topBtns_btns}
      >
        Angry Tools
      </Button>
      <Button
        type="default"
        icon={<Html5Outlined />}
        onClick={() => handleBtnOnClick("animista")}
        className={style.lw_component_topBtns_btns}
      >
        Animista
      </Button>
      <Button
        type="default"
        icon={<Html5Outlined />}
        onClick={() => handleBtnOnClick("flatuicolors")}
        className={style.lw_component_topBtns_btns}
      >
        Flat UI Colors
      </Button>
    </>
  );
};

export default ComponentTopBtns;
