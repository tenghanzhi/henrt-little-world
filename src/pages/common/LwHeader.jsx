import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Menu, ConfigProvider, Tooltip } from "antd";
import {
  AppstoreOutlined,
  Html5Outlined,
  UserOutlined,
  HomeOutlined,
  StarOutlined,
  SmileOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { SiLeetcode } from "react-icons/si";
import categoryMatrix from "./categoryMatrix";
import HeaderLinks from "./HeaderLinks";
import HomePageLayoutSetup from "./HomePageLayoutSetup";
import style from "./style/LwHeader.module.css";

const LwHeader = () => {
  const location = useLocation();
  const userInfoData = useSelector((state) => state.userInfoData);
  const showHomeMenu = useSelector((state) => state.showHomeMenu);
  const showHomeLink = useSelector((state) => state.showHomeLink);
  const selectedKeys = location.pathname.slice(1);
  const menuItems = [
    {
      label: (
        <Tooltip placement="bottom" title={"Sweet Home! 🏠"} trigger={"hover"}>
          {" "}
          <Link to="/">{categoryMatrix.HOME}</Link>
        </Tooltip>
      ),
      key: categoryMatrix.HOME.toLowerCase(),
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Tooltip
          placement="bottom"
          title={"LeetCode Questions' Solutions 🧑‍💻"}
          trigger={"hover"}
        >
          <Link to={`/${categoryMatrix.LEETCODES.toLowerCase()}`}>
            {categoryMatrix.LEETCODES}
          </Link>
        </Tooltip>
      ),
      key: categoryMatrix.LEETCODES.toLowerCase(),
      icon: <SiLeetcode />,
    },
    {
      label: (
        <Tooltip
          placement="bottom"
          title={"JavaScript Useful Functions 🛠️"}
          trigger={"hover"}
        >
          <Link to={`/${categoryMatrix.APPLICATIONS.toLowerCase()}`}>
            {categoryMatrix.APPLICATIONS}
          </Link>
        </Tooltip>
      ),
      key: categoryMatrix.APPLICATIONS.toLowerCase(),
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <Tooltip
          placement="bottom"
          title={"Plug-n-Play JS/React Components 🛞"}
          trigger={"hover"}
        >
          <Link to={`/${categoryMatrix.COMPONENTS.toLowerCase()}`}>
            {categoryMatrix.COMPONENTS}
          </Link>
        </Tooltip>
      ),
      key: categoryMatrix.COMPONENTS.toLowerCase(),
      icon: <Html5Outlined />,
    },
    {
      label: (
        <Tooltip
          placement="bottom"
          title={"Henry's Recommendations 👍"}
          trigger={"hover"}
        >
          <Link to={`/${categoryMatrix.FAVORITES.toLowerCase()}`}>
            {categoryMatrix.FAVORITES}
          </Link>
        </Tooltip>
      ),
      key: categoryMatrix.FAVORITES.toLowerCase(),
      icon: <StarOutlined />,
    },
    {
      label: (
        <Tooltip
          placement="bottom"
          title={"Check Updates & Leave Message 📢"}
          trigger={"hover"}
        >
          <Link to={`/${categoryMatrix.BULLETINBOARDS.toLowerCase()}`}>
            Bulletin Board
          </Link>
        </Tooltip>
      ),
      key: categoryMatrix.BULLETINBOARDS.toLowerCase(),
      icon: <MessageOutlined />,
    },
    {
      label: (
        <Tooltip placement="bottom" title={"Henry Inside 😎"} trigger={"hover"}>
          <Link to={`/${categoryMatrix.PORTFOLIO.toLowerCase()}`}>
            About Me
          </Link>
        </Tooltip>
      ),
      key: categoryMatrix.PORTFOLIO.toLowerCase(),
      icon: <SmileOutlined />,
    },
    {
      label: (
        <Tooltip
          placement="bottom"
          title={
            userInfoData?.jwt
              ? `Check Account Details 👤`
              : `Create a New Account 👤`
          }
          trigger={"hover"}
        >
          <Link to={`/${categoryMatrix.USER.toLowerCase()}`}>
            {userInfoData?.jwt
              ? `Hello! ${userInfoData?.user?.username}`
              : "Login/Register"}
          </Link>
        </Tooltip>
      ),
      key: categoryMatrix.USER.toLowerCase(),
      icon: <UserOutlined />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#212121",
          colorInfoHover: "#FFFFFF",
          colorBgSpotlight: "#212121",
        },
      }}
    >
      <Layout.Header className={style.lw_header_wrapper}>
        {showHomeMenu && (
          <Menu
            className={style.lw_header_menu}
            theme="dark"
            mode="horizontal"
            items={menuItems}
            defaultSelectedKeys={["home"]}
            selectedKeys={[selectedKeys === "" ? "home" : selectedKeys]}
          />
        )}
        {!selectedKeys && <HomePageLayoutSetup />}
        {showHomeLink && <HeaderLinks />}
      </Layout.Header>
    </ConfigProvider>
  );
};

export default LwHeader;
