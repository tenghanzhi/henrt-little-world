import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined, CodeOutlined } from "@ant-design/icons";
import categoryMatrix from "../common/categoryMatrix";
import style from "./style/LeetCodesTopBtns.module.css";

const LeetCodesTopBtns = () => {
  const navigate = useNavigate();
  const userInfoData = useSelector((state) => state.userInfoData);

  const handleBtnOnClick = (type) => {
    switch (type.toLowerCase()) {
      case "lc en":
        window.open(
          "https://leetcode.com/problemset/all/",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "lc cn":
        window.open(
          "https://leetcode.cn/problemset/all/",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "nc":
        window.open(
          "https://neetcode.io/roadmap",
          "_blank",
          "noopener, noreferrer"
        );
        break;
      case "create":
        navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}/createLeetCodes`);
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
          className={style.lw_leetcodes_topBtns_btns}
        >
          Create New
        </Button>
      )}
      <Button
        type="default"
        icon={<CodeOutlined />}
        onClick={() => handleBtnOnClick("lc cn")}
        className={style.lw_leetcodes_topBtns_btns}
      >
        LeetCode CN
      </Button>
      <Button
        type="default"
        icon={<CodeOutlined />}
        onClick={() => handleBtnOnClick("lc en")}
        className={style.lw_leetcodes_topBtns_btns}
      >
        LeetCode EN
      </Button>
      <Button
        type="default"
        icon={<CodeOutlined />}
        onClick={() => handleBtnOnClick("nc")}
        className={style.lw_leetcodes_topBtns_btns}
      >
        NeetCode
      </Button>
    </>
  );
};

export default LeetCodesTopBtns;
