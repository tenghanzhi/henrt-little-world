import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import Login from "./Login";
import ReviewUser from "./ReviewUser";
import LwLayout from "../common/LwLayout";
import style from "./style/User.module.css";

const User = () => {
  const userInfoData = useSelector((state) => state.userInfoData);
  const [isLogined, setIsLogined] = useState(Boolean(userInfoData?.jwt));

  useEffect(() => {
    setIsLogined(Boolean(userInfoData?.jwt));
  }, [userInfoData]);
  const pageContent = (
    <>
      <Typography.Title level={4} className={style.lw_user_header}>
        {isLogined
          ? `Hello! ${userInfoData?.user?.username}`
          : "Please Login/Register"}
      </Typography.Title>
      {!isLogined && <Login />}
      {isLogined && <ReviewUser />}
    </>
  );
  return <LwLayout content={pageContent} />;
};

export default User;
