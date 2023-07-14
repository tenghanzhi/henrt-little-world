import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import {
  PlusOutlined,
  CodeOutlined,
  CodeSandboxOutlined,
  CodepenOutlined,
} from "@ant-design/icons";
import categoryMatrix from "../common/categoryMatrix";
import style from "./style/ApplicationsTopBtns.module.css";

const ApplicationsTopBtns = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);

  const handleBtnOnClick = (type) => {
    switch (type.toLowerCase()) {
      case "codesandbox":
        window.open(
          "https://codesandbox.io/",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "codepen":
        window.open("https://codepen.io/", "_blank", "noopener, noreferrer");
        break;
      case "jsfiddle":
        window.open("https://jsfiddle.net/", "_blank", "noopener, noreferrer");
        break;
      case "create":
        navigate(
          `/${categoryMatrix.APPLICATIONS.toLowerCase()}/createApplications`
        );
        break;
      default:
        return null;
    }
  };

  return (
    <>
      {userInfoData?.user?.username === "tenghanzhi" && (
        <Tooltip
          title={
            !userInfoData.jwt ? "Please login with admin account to create" : ""
          }
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleBtnOnClick("create")}
            disabled={!userInfoData.jwt}
            className={style.lw_applications_topBtns_btns}
          >
            Create New
          </Button>
        </Tooltip>
      )}
      <Button
        type="default"
        icon={<CodeSandboxOutlined />}
        onClick={() => handleBtnOnClick("codesandbox")}
        className={style.lw_applications_topBtns_btns}
      >
        CodeSandBox
      </Button>
      <Button
        type="default"
        icon={<CodepenOutlined />}
        onClick={() => handleBtnOnClick("codepen")}
        className={style.lw_applications_topBtns_btns}
      >
        CodePen
      </Button>
      <Button
        type="default"
        icon={<CodeOutlined />}
        onClick={() => handleBtnOnClick("jsfiddle")}
        className={style.lw_applications_topBtns_btns}
      >
        JSFiddle
      </Button>
    </>
  );
};

export default ApplicationsTopBtns;
